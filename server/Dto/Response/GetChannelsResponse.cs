namespace server.Dto.Response;
public record GetChannelResponse(int Id, string Name);

public record GetChannelsResponse(ICollection<GetChannelResponse> Channels);
