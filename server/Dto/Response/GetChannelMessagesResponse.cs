using System.Reflection.Metadata;

namespace server.Dto.Response;

public class ChannelMessageResponse
{
    public int Id { get; }

    public string Message { get; }
    public string Attachment { get; set; }
    public string Username { get; }
    public string? Avatar { get; }
    public DateTime CreatedAt { get; }
    public DateTime UpdateAt { get; }

    public ChannelMessageResponse(int id, string message, string attachment, string username, string? avatar, DateTime createdAt, DateTime updateAt)
    {
        Id = id;
        Message = message;
        Attachment = attachment;
        Username = username;
        Avatar = avatar;
        CreatedAt = createdAt;
        UpdateAt = updateAt;
    }

};

public record GetChannelMessagesResponse(List<ChannelMessageResponse> Messages);
