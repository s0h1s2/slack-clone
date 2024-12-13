namespace server.Database;

public enum WorkspaceUserRole
{
    User = 0,
    Admin = 1
}
public class WorkspaceMembers
{
    public int Id { get; set; }
    public int WorkspaceId { get; set; }
    public int UserId{ get; set; }
    public Workspace Workspace { get; set; } = null!;
    public User User{ get; set; } = null!;
    public WorkspaceUserRole Role { get; set; }
}