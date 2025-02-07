using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Hubs;

namespace server.Services;

public class ChannelService
{
    private readonly AppDbContext _context;
    private readonly UsersService _usersService;
    private readonly IFileService _fileService;
    private readonly IHubContext<ChannelHub, IChannelHub> _channelHub;

    public ChannelService(AppDbContext context, UsersService usersService, IFileService fileService, IHubContext<ChannelHub, IChannelHub> channelHub)
    {
        _context = context;
        _usersService = usersService;
        _fileService = fileService;
        _channelHub = channelHub;
    }
    public async Task<ChannelResponse?> GetChannel(int channelId)
    {
        var uid = _usersService.GetAuthenicatedUserId();
        if (uid == null) throw new PermmissionException("Only authenticated user can see this channel.");
        var channel = await _context.WorkspaceChannels.
        Include((ch) => ch.Chats.Where((chat) => chat.ParentId == null).OrderByDescending((chat) => chat.Id).Take(10)).
        ThenInclude((chat) => chat.User).
        FirstOrDefaultAsync((channel) => channel.Id == channelId);
        if (channel == null) return null;
        var member = await _context.WorkspaceMembers.FirstOrDefaultAsync(m => m.WorkspaceId == channel.WorkspaceId && m.UserId == uid);
        if (member == null) throw new PermmissionException("Only members of this workspace can see this channel.");

        return new ChannelResponse(
            channel.Id,
            channel.Name,
            channel.CreatedAt,
            (await Task.WhenAll(channel.Chats.Select(async chat =>
                await ChannelMessageResponse.FromChat(chat, _fileService))))
            .ToList()
        );

    }
    public async Task<GetChannelsResponse> GetWorkspaceChannels(int workspaceId)
    {
        var userId = _usersService.GetAuthenicatedUserId();

        var workspace = await _context.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var workspaceMember =
            await _context.WorkspaceMembers.FirstOrDefaultAsync(
                m => m.WorkspaceId == workspaceId && m.UserId == userId);
        if (workspaceMember == null) throw new PermmissionException("Only members of this workspace can see this channel.");
        var channels = await _context.WorkspaceChannels.Where(m => m.WorkspaceId == workspaceId).ToListAsync();

        return new GetChannelsResponse(channels.Select((channel) => new GetChannelResponse(channel.Id, channel.Name)).ToList());
    }

    public async Task<CreateChannelResponse> CreateChannel(CreateWorkspaceChannelRequest channelRequest, int workspaceId)
    {
        var userId = _usersService.GetAuthenicatedUserId();

        var workspace = await _context.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var workspaceMember = await _context.WorkspaceMembers.FirstOrDefaultAsync(m => m.WorkspaceId == workspaceId && m.UserId == userId);
        if (workspaceMember == null) throw new ResourceNotFound();
        if (workspaceMember.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin channel can create channel");
        var channel = new WorkspaceChannel() { Name = channelRequest.Name, WorkspaceId = workspaceId };
        _context.WorkspaceChannels.Add(channel);
        await _context.SaveChangesAsync();
        return new CreateChannelResponse(channel.Id, channel.Name);
    }
    public async Task ChatChannel(int channelId, ChatMessageRequest chat)
    {
        string? fileId = null;
        if (chat.Attachment != null)
        {
            fileId = await _fileService.UploadFileAsync(chat.Attachment);
        }
        var userId = _usersService.GetAuthenicatedUserId();
        var newMessage = new Chat
        {
            Message = chat.Chat,
            ChannelId = channelId,
            AttachmentName = fileId,
            UserId = userId,
            ParentId = chat.ParentId,
            CreatedAt = DateTime.UtcNow,
            UpdateAt = null
        };
        _context.Add(newMessage);
        await _context.SaveChangesAsync();
        await _context.Entry(newMessage).Reference((chat) => chat.User).LoadAsync();
        var mappedResult = await ChannelMessageResponse.FromChat(newMessage, _fileService);
        await _channelHub.Clients.Group(channelId.ToString()).ReceiveMessage(mappedResult);
    }

    public async Task<GetChannelMessagesResponse> GetChannelMessages(int channelId, int? lastMessageId)
    {
        // TODO: check if user is member of this workspace or channel
        var messages = await _context.Chats
            .Include((chat) => chat.User)
            .Where((chat) => chat.ChannelId == channelId && chat.ParentId == null && (lastMessageId == null || lastMessageId > chat.Id))
            .Take(12)
            .OrderByDescending(chat => chat.Id)
            .ToListAsync();

        var messagesResult = new List<ChannelMessageResponse>();
        foreach (var message in messages)
        {
            var result = await ChannelMessageResponse.FromChat(message, _fileService);
            messagesResult.Add(result);
        }

        return new GetChannelMessagesResponse(messagesResult, messagesResult.Count > 0 ? messagesResult.Last().Id : null);
    }

}