namespace server.Database;

public class Conversation
{
    public int Id { get; set; }
    public int Receiver { get; set; }
    public int Sender { get; set; }
    public required User SenderUser { get; set; }
    public required User ReceiverUser { get; set; }
    public required string Message { get; set; }

    public string? AttachmentName { get; set; }
}