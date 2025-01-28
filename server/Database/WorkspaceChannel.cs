using server.Database;

public class WorkspaceChannel
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int WorkspaceId { get; set; }

    public Workspace Workspace { get; set; }

    public virtual List<Chat> Chats { get; set; } = new List<Chat>();


    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdateAt { get; set; } = null;

}