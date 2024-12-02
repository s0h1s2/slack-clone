namespace server.Domain;

public class Workspace
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public User Owner { get; set; }
    public string JoinCode { get; set; }
}