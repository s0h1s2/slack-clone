using server.Dto.Response;

public record ChannelResponse(int Id, string Name, DateTime CreatedAt, List<ChannelMessageResponse> Messages);