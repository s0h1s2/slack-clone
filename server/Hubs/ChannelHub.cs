using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;

public class ChannelHub : Hub<IChannelHub>
{
    public async Task JoinChannel(int channelId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, channelId.ToString());

    }

    public async Task JoinThread(int threadId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, threadId.ToString());

    }

}
