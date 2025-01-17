namespace server.Dto.Response;

public class ChannelMessageResponse
{
    public string Message { get; }
    public string Attachment { get; set; }
    public string Username { get; }
    public string? Avatar { get; }

    public ChannelMessageResponse(string message, string attachment, string username, string? avatar)
    {
        Message = message;
        Attachment = attachment;
        Username = username;
        Avatar = avatar;
    }
};

public record GetChannelMessagesResponse(List<ChannelMessageResponse> Messages);
