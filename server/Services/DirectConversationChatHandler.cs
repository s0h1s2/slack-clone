namespace server.Services;

public class DirectConversationChatHandler:IChatHandler
{
    public Task ChatHandlerAsync(ChatMessageRequest request)
    {
    }

    public ChatHandlerType GetChatHandlerType()
    {
        return ChatHandlerType.DirectMessage;
    }

}