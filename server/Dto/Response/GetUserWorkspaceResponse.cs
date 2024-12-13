using server.Database;

namespace server.Dto.Response;

public record GetUserWorkspaceResponse(int Id, string Name);

public class GetUserWorkspacesResponse
{
    public ICollection<GetUserWorkspaceResponse> Workspaces { get; set; }
}