using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;

class ConversationHub : Hub<IConversationHub>
{
    public async Task JoinConversation(string receiverId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, receiverId);
    }

}