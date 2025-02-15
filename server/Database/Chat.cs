namespace server.Database;

public class Chat
{
    public int Id { get; set; }

    public int? ParentId { get; set; }

    public int TotalReplies { get; set; }


    public string Message { get; set; }
    public string? AttachmentName { get; set; }
    public WorkspaceChannel? Channel { get; set; }
    public int? ChannelId { get; set; }

    public User User { get; set; }
    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdateAt { get; set; } = null!;

    public int? ConversationId { get; set; }
    public Conversation? Conversation { get; set; }

}