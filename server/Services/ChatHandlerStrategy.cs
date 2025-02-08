namespace server.Services;

public class ChatHandlerStrategy
{
    private readonly IEnumerable<IChatHandler> _chatHandlers;

    public ChatHandlerStrategy(IEnumerable<IChatHandler> chatHandlers)
    {
        _chatHandlers = chatHandlers;
    }
    public async Task ChatHandler(ChatMessageRequest chatMessageRequest)
    {
        IChatHandler? chatHandler = _chatHandlers.FirstOrDefault(handler=>handler.GetChatHandlerType()==chatMessageRequest.ChatType);
        if (chatHandler == null) throw new ArgumentException($"{chatMessageRequest.ChatType} not found");
        
        await chatHandler.ChatHandlerAsync(chatMessageRequest);
    }
}