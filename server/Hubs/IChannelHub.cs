using server.Dto.Response;

namespace server.Hubs;

public interface IChannelHub
{
    Task ReceiveMessage(ChannelMessageResponse message);
    Task DeleteMessage(int messageId);
}