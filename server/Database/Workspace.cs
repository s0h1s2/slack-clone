namespace server.Database;

public class Workspace
{
    public int Id { get; set; }

    public string Name { get; set; } = String.Empty;
    public string JoinCode{ get; set; }=String.Empty;
    
    public int UserId { get; set; }

    public User User{ get; set; } = null!;
}