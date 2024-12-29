using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;

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
        // var channels = await _dbContext.WorkspaceChannels.Where(channel => channel.WorkspaceId == workspace.Id).ToListAsync();
        var members = await _dbContext.WorkspaceMembers.Where(member => member.WorkspaceId == workspace.Id).Include(member => member.User).ToListAsync();
        // var memberResult = members.Select(member => new GetMember(member.UserId, member.User.Name, null)).ToList();

        return new GetWorkspaceResponse(workspace.Id, workspace.Name, workspace.JoinCode, userHasAccess.Role == WorkspaceUserRole.Admin, members.Select(member => new GetMember(member.UserId, member.User.Name, null)).ToList());
    }

    public async Task<CreateWorkspaceResponse> CreateWorkspaceWithGeneralChannel(CreateWorkspaceRequest request, User user)
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
        _dbContext.WorkspaceChannels.Add(new WorkspaceChannel() { WorkspaceId = workspace.Id, Name = "general" });
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
    public void DeleteWorkspace(int id, User user)
    {
        var workspace = _dbContext.Workspaces.Find(id);
        if (workspace == null) throw new ResourceNotFound();

        var isUserAdmin = _dbContext.WorkspaceMembers.FirstOrDefault((member) => member.WorkspaceId == id && member.UserId == user.Id);
        if (isUserAdmin == null) throw new ResourceNotFound();

        if (isUserAdmin.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin can delete workspaces");
        _dbContext.Remove(workspace);
        _dbContext.SaveChanges();

    }
    public async Task<JoinCodeResponse> GenerateWorkspaceNewJoinCode(int workspaceId, User user)
    {
        var workspace = await _dbContext.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var member = await _dbContext.WorkspaceMembers.SingleOrDefaultAsync((member) => member.UserId == user.Id && member.WorkspaceId == workspaceId);
        if (member == null) throw new ResourceNotFound();
        if (member.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin can generate new code");
        var joiningCode = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);
        return new JoinCodeResponse(joiningCode);
    }

}
