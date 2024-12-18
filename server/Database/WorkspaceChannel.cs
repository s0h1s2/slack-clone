using server.Database;

public class WorkspaceChannel
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int WorkspaceId{ get; set; }
    
    public Workspace Workspace{ get; set; }

}