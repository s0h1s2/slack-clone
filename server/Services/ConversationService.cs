using server.Database;
using server.Dto.Request;
using server.Exceptions;

namespace server.Services;
class ConversationService
{
    private readonly IFileService _fileService;
    private readonly UsersService _usersService;
    private readonly AppDbContext _dbContext;
    public ConversationService(IFileService fileService, UsersService usersService, AppDbContext dbContext)
    {
        _fileService = fileService;
        _usersService = usersService;
        _dbContext = dbContext;
    }

    public async Task DirectMessage(int conversationId, DirectMessageRequest directMessage)
    {
        var currentUserId = _usersService.GetAuthenicatedUserId();

        var conversation = await _dbContext.Conversations.FindAsync(conversationId);
        if (conversation is null)
        {
            throw new ResourceNotFound()
        }
        if (conversation.Sender != currentUserId || conversation.Receiver != directMessage.Receiver)
        {
            throw new PermmissionException();
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