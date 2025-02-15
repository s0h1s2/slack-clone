namespace server.Database;

public class Conversation
{
    public int Id { get; set; }
    public required int Receiver { get; set; }
    public required int Sender { get; set; }
    public User SenderUser { get; set; } = null!;
    public User ReceiverUser { get; set; } = null!;
    public int WorkspaceId { get; set; }
    public Workspace Workspace { get; set; }
}