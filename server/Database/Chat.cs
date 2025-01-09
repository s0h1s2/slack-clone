namespace server.Database;

public class Chat
{
    public int Id { get; set; }
    public string Message { get; set; }
    public string AttachmentName { get; set; }
    public WorkspaceChannel Channel { get; set; }
    public int ChannelId { get; set; }
}
