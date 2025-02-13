using server.Dto.Response;

namespace server.Hubs;

public interface IDirectMessageHub
{
    Task ReceiveMessage(ChannelMessageResponse message);
    Task ThreadMessage(ChannelMessageResponse message);
    Task DeleteMessage(int messageId);
    Task UpdateMessage(int messageId, string body, DateTime updateTime);
}