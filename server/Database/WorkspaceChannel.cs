using server.Database;

public class WorkspaceChannel
{
    public int Id { get; set; }
    public string Name { get; set; }

    public Workspace Workspace;
    public int WorkspaceId;

}