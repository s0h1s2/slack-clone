namespace server.Services;

public interface IChatHandler
{
    public Task ChatHandlerAsync(ChatMessageRequest request);
    public ChatHandlerType GetChatHandlerType();
    

}