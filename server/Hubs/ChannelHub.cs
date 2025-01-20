using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;

public class ChannelHub : Hub
{
    public async Task JoinChannel(int channelId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, channelId.ToString());
    }
    public async Task SendMessage(int channelId, string message)
    {
        await Clients.Group(channelId.ToString()).SendAsync("ReceiveMessage", message);
    }

}
