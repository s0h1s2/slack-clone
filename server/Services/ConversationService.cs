using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;

namespace server.Services;

public class ConversationService
{
    private readonly AppDbContext _dbContext;
    private readonly IFileService _fileService;
    private readonly UsersService _usersService;

    public ConversationService(IFileService fileService, UsersService usersService, AppDbContext dbContext)
    {
        _fileService = fileService;
        _usersService = usersService;
        _dbContext = dbContext;
    }

    public async Task<GetChannelMessagesResponse> GetConversationMessages(int conversationId)
    {
        var chatsConversation = await _dbContext.Chats.Where((c) => c.ConversationId == conversationId).ToListAsync();
        var messages = await Task.WhenAll(
            chatsConversation.Select(async (c) => await ChannelMessageResponse.FromChat(c, _fileService)).ToList());

        return new GetChannelMessagesResponse(messages, 0);
    }

    public async Task<Conversation> CreateConversation(CreateConversationRequest request)
    {
        var isConversationExist=await _dbContext.Conversations
            .Where((c) => c.Receiver == request.ReceiverId && c.WorkspaceId == request.WorkspaceId)
            .FirstOrDefaultAsync();
        if (isConversationExist!=null) 
        {
            throw new Exception();
        }
        var userId = _usersService.GetAuthenicatedUserId();
        var conversation = new Conversation
        {
            Sender = userId,
            Receiver = request.ReceiverId,
            WorkspaceId = request.WorkspaceId,
        };
        _dbContext.Conversations.Add(conversation);
        await _dbContext.SaveChangesAsync();
        return conversation;
    }

    public async Task DirectMessage(int conversationId, DirectMessageRequest directMessage)
    {
        var currentUserId = _usersService.GetAuthenicatedUserId();

        var conversation = await _dbContext.Conversations.FindAsync(conversationId);
        if (conversation is null)
        {
            throw new ResourceNotFound();
        }

        if (conversation.Sender != currentUserId || conversation.Receiver != directMessage.Receiver)
        {
            throw new PermmissionException("Can't direct message to conversation");
        }

        var file = await _fileService.UploadFileAsync(directMessage.File);

        var chat = new Chat
        {
            ConversationId = conversation.Id,
            Message = directMessage.Message,
            AttachmentName = file,
            UserId = currentUserId
        };
        _dbContext.Add(chat);
        await _dbContext.SaveChangesAsync();
    }
}