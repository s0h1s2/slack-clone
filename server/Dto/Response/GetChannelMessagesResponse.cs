namespace server.Dto.Response;

public record ChannelMessageResponse(string Message, string Attachment,string Username,string? Avatar);

public record GetChannelMessagesResponse(List<ChannelMessageResponse> Messages);
