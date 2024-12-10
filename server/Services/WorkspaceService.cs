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

    public async Task<CreateWorkspaceResponse> CreateWorkspace(CreateWorkspaceRequest request,User user)
    {
        // TODO: i'm not sure about this approach need more research.
       var joiningCode=Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);
       
       var workspace = new Workspace()
       {
           Name = request.Name,
           JoinCode = joiningCode,
           UserId = user.Id,
       };
       _dbContext.Workspaces.Add(workspace);
       await _dbContext.SaveChangesAsync();
       return new CreateWorkspaceResponse(workspace.Id,workspace.Name,joiningCode);
       
    }
}