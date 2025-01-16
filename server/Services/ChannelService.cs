using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;

namespace server.Services;

public class ChannelService
{
    private readonly AppDbContext _context;
    private readonly UsersService _usersService;
    private readonly IFileService _fileService;
    
    public ChannelService(AppDbContext context, UsersService usersService,IFileService fileService)
    {
        _context = context;
        _usersService = usersService;
        _fileService = fileService;
    }
    public async Task<ChannelResponse?> GetChannel(int channelId)
    {
        var uid = await _usersService.GetAuthenicatedUserId();

        if (uid == null) throw new PermmissionException("Only authenticated user can see this channel.");
        var channel = await _context.WorkspaceChannels.FindAsync(channelId);
        if (channel == null) return null;
        var member = await _context.WorkspaceMembers.FirstOrDefaultAsync(m => m.WorkspaceId == channel.WorkspaceId && m.UserId == uid);
        if (member == null) throw new PermmissionException("Only members of this workspace can see this channel.");
        return new ChannelResponse(channel.Id, channel.Name);
    }
    public async Task<GetChannelsResponse> GetWorkspaceChannels(int workspaceId, User user)
    {
        var workspace = await _context.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var workspaceMember =
            await _context.WorkspaceMembers.FirstOrDefaultAsync(
                m => m.WorkspaceId == workspaceId && m.UserId == user.Id);
        if (workspaceMember == null) throw new PermmissionException("Only members of this workspace can see this channel.");
        var channels = await _context.WorkspaceChannels.Where(m => m.WorkspaceId == workspaceId).ToListAsync();

        return new GetChannelsResponse(channels.Select((channel) => new GetChannelResponse(channel.Id, channel.Name)).ToList());
    }

    public async Task<CreateChannelResponse> CreateChannel(CreateWorkspaceChannelRequest channelRequest, int workspaceId, User user)
    {
        var workspace = await _context.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var workspaceMember = await _context.WorkspaceMembers.FirstOrDefaultAsync(m => m.WorkspaceId == workspaceId && m.UserId == user.Id);
        if (workspaceMember == null) throw new ResourceNotFound();
        if (workspaceMember.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin channel can create channel");
        var channel = new WorkspaceChannel() { Name = channelRequest.Name, WorkspaceId = workspaceId };
        _context.WorkspaceChannels.Add(channel);
        await _context.SaveChangesAsync();
        return new CreateChannelResponse(channel.Id, channel.Name);
    }
    public async Task<bool> ChatChannel(int channelId, ChatMessageRequest chat)
    {
        string? fileId=String.Empty;
        if (chat.Attachment!=null)
        {
            fileId=await _fileService.UploadFileAsync(chat.Attachment);
        }
        var userId=await _usersService.GetAuthenicatedUserId();
        _context.Add(new Chat { Message = chat.Chat, ChannelId = channelId,AttachmentName = fileId, UserId = userId??0 });
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<GetChannelMessagesResponse> GetChannelMessages(int channelId)
    {
        var messages= await _context.Chats.Include((chat)=>chat.User).Where((chat =>chat.ChannelId==channelId)).ToListAsync();
        return new GetChannelMessagesResponse(messages.Select((message)=>new ChannelMessageResponse(message.Message,message.AttachmentName,message.User.Name,"nothing-yet.jpg")).ToList());
    }
    
}