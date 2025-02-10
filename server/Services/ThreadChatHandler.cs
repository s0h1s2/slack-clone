namespace server.Services;

public class ThreadChatHandler:IChatHandler
{
    public ThreadChatHandler()
    {
    }

    public Task ChatHandlerAsync(ChatMessageRequest request)
    {
        throw new NotImplementedException();
    }

    public ChatHandlerType GetChatHandlerType()
    {
        return ChatHandlerType.Thread;
    }


}