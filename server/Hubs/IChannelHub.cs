using server.Database;

namespace server.Hubs;

public interface IChannelHub
{
    Task ReceiveMessage(Chat message);
}