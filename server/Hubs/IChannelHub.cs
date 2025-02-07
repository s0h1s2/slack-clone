using server.Dto.Response;

namespace server.Hubs;

public interface IChannelHub
{
    Task ReceiveMessage(ChannelMessageResponse message);
    Task ThreadMessage(ChannelMessageResponse message);
    Task DeleteMessage(int messageId);
    Task UpdateMessage(int messageId, string body, DateTime updateTime);
}