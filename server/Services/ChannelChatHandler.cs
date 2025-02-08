namespace server.Services;

public class ChannelChatHandler:IChatHandler
{
    public ChannelChatHandler()
    {
    }

    public Task ChatHandlerAsync(ChatMessageRequest request)
    {
        throw new Exception("It's working bitch!");
        
    }

    public ChatHandlerType GetChatHandlerType()
    {
        return ChatHandlerType.Channel;
        
    }
}