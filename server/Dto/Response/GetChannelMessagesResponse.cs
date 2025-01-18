using System.Reflection.Metadata;

namespace server.Dto.Response;

public class ChannelMessageResponse
{
    public string Message { get; }
    public string Attachment { get; set; }
    public string Username { get; }
    public string? Avatar { get; }
    public DateTime CreatedAt { get; }
    public DateTime UpdateAt { get; }

    public ChannelMessageResponse(string message, string attachment, string username, string? avatar, DateTime createdAt, DateTime updateAt)
    {
        Message = message;
        Attachment = attachment;
        Username = username;
        Avatar = avatar;
        CreatedAt = createdAt;
        UpdateAt = updateAt;
    }

};

public record GetChannelMessagesResponse(List<ChannelMessageResponse> Messages);
