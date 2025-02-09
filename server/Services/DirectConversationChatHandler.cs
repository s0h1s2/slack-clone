namespace server.Services;

public class DirectConversationChatHandler:IChatHandler
{
    public Task ChatHandlerAsync(ChatMessageRequest request)
    {
        throw new NotImplementedException();
    }

    public ChatHandlerType GetChatHandlerType()
    {
        return ChatHandlerType.DirectMessage;
    }

}