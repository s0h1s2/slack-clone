using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;

namespace server.Services;

public class WorkspaceService
{
    private readonly AppDbContext _dbContext;

    public WorkspaceService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetUserWorkspacesResponse> GetUserWorkspaces(User user)
    {
        var result = await _dbContext.WorkspaceMembers.Where(member => member.UserId == user.Id)
            .Include(member => member.Workspace).ToListAsync();
        List<GetUserWorkspaceResponse> workspaces = result.Select(workspace => new GetUserWorkspaceResponse(workspace.Workspace.Id, workspace.Workspace.Name)).ToList();

        return new GetUserWorkspacesResponse()
        {
            Workspaces = workspaces
        };
    }
    public async Task<GetWorkspaceResponse?> GetWorkspace(int id, User user)
    {
        var workspace = await _dbContext.Workspaces.FindAsync(id);
        if (workspace == null) return null;
        var userHasAccess = await _dbContext.WorkspaceMembers.Where(member => member.UserId == user.Id && member.WorkspaceId == workspace.Id).FirstOrDefaultAsync();
        if (userHasAccess == null) return null;
        return new GetWorkspaceResponse(workspace.Id, workspace.Name, workspace.JoinCode, userHasAccess.Role);
    }

    public async Task<CreateWorkspaceResponse> CreateWorkspace(CreateWorkspaceRequest request, User user)
    {
        // TODO: i'm not sure about this approach need more research.
        var joiningCode = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);

        var workspace = new Workspace()
        {
            Name = request.Name,
            JoinCode = joiningCode,
            UserId = user.Id,
        };

        _dbContext.Workspaces.Add(workspace);
        await _dbContext.SaveChangesAsync();
        var member = new WorkspaceMembers()
        {
            UserId = user.Id,
            Role = WorkspaceUserRole.Admin,
            WorkspaceId = workspace.Id
        };
        _dbContext.WorkspaceMembers.Add(member);
        await _dbContext.SaveChangesAsync();
        return new CreateWorkspaceResponse(workspace.Id, workspace.Name, joiningCode);
    }
}