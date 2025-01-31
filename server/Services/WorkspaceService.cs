using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;

namespace server.Services;

public class WorkspaceService
{
    private readonly AppDbContext _dbContext;
    private readonly UsersService _usersService;

    public WorkspaceService(AppDbContext dbContext, UsersService usersService)
    {
        _dbContext = dbContext;
        _usersService = usersService;
    }

    public async Task<GetUserWorkspacesResponse> GetUserWorkspaces()
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var result = await _dbContext.WorkspaceMembers.Where(member => member.UserId == userId)
            .Include(member => member.Workspace).ToListAsync();
        List<GetUserWorkspaceResponse> workspaces = result.Select(workspace => new GetUserWorkspaceResponse(workspace.Workspace.Id, workspace.Workspace.Name)).ToList();

        return new GetUserWorkspacesResponse()
        {
            Workspaces = workspaces
        };
    }
    public async Task<GetWorkspaceResponse?> GetWorkspace(int id)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var workspace = await _dbContext.Workspaces.FindAsync(id);
        if (workspace == null) return null;
        var userHasAccess = await _dbContext.WorkspaceMembers.Where(member => member.UserId == userId && member.WorkspaceId == workspace.Id).FirstOrDefaultAsync();
        if (userHasAccess == null) return null;
        // var channels = await _dbContext.WorkspaceChannels.Where(channel => channel.WorkspaceId == workspace.Id).ToListAsync();
        var members = await _dbContext.WorkspaceMembers.Where(member => member.WorkspaceId == workspace.Id).Include(member => member.User).ToListAsync();
        // var memberResult = members.Select(member => new GetMember(member.UserId, member.User.Name, null)).ToList();

        return new GetWorkspaceResponse(workspace.Id, workspace.Name, workspace.JoinCode, userHasAccess.Role == WorkspaceUserRole.Admin, members.Select(member => new GetMember(member.UserId, member.User.Name, null)).ToList());
    }
    public async Task<GetWorkspacePublicInfoResponse?> GetWorkspacePublicInfo(int id)
    {
        var workspace = await _dbContext.Workspaces.FindAsync(id);
        if (workspace == null) return null;
        return new GetWorkspacePublicInfoResponse(workspace.Name);
    }
    public async Task<CreateWorkspaceResponse> CreateWorkspaceWithGeneralChannel(CreateWorkspaceRequest request)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var joiningCode = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);

        var workspace = new Workspace()
        {
            Name = request.Name,
            JoinCode = joiningCode,
            UserId = userId,
        };

        _dbContext.Workspaces.Add(workspace);
        await _dbContext.SaveChangesAsync();
        _dbContext.WorkspaceChannels.Add(new WorkspaceChannel() { WorkspaceId = workspace.Id, Name = "general" });
        await _dbContext.SaveChangesAsync();

        var member = new WorkspaceMembers()
        {
            UserId = userId,
            Role = WorkspaceUserRole.Admin,
            WorkspaceId = workspace.Id
        };
        _dbContext.WorkspaceMembers.Add(member);
        await _dbContext.SaveChangesAsync();
        return new CreateWorkspaceResponse(workspace.Id, workspace.Name, joiningCode);
    }
    public void DeleteWorkspace(int id)
    {
        var userId = _usersService.GetAuthenicatedUserId();

        var workspace = _dbContext.Workspaces.Find(id);
        if (workspace == null) throw new ResourceNotFound();

        var isUserAdmin = _dbContext.WorkspaceMembers.FirstOrDefault((member) => member.WorkspaceId == id && member.UserId == userId);
        if (isUserAdmin == null) throw new ResourceNotFound();

        if (isUserAdmin.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin can delete workspaces");
        _dbContext.Remove(workspace);
        _dbContext.SaveChanges();

    }
    public async Task<JoinCodeResponse> GenerateWorkspaceNewJoinCode(int workspaceId)
    {
        var userId = _usersService.GetAuthenicatedUserId();

        var workspace = await _dbContext.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var member = await _dbContext.WorkspaceMembers.SingleOrDefaultAsync((member) => member.UserId == userId && member.WorkspaceId == workspaceId);
        if (member == null) throw new ResourceNotFound();
        if (member.Role != WorkspaceUserRole.Admin) throw new PermmissionException("Only admin can generate new code");
        var joiningCode = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);
        workspace.JoinCode = joiningCode;
        _dbContext.Update(workspace);
        await _dbContext.SaveChangesAsync();
        return new JoinCodeResponse(joiningCode);
    }
    public async Task JoinWorkspace(int workspaceId, JoinWorkspaceRequest joinRequest)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var workspace = _dbContext.Workspaces.Find(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        if (workspace.JoinCode != joinRequest.JoinCode) throw new InvalidJoinCodeException();
        // check if current user is member
        var member = await _dbContext.WorkspaceMembers.Where(member => member.WorkspaceId == workspace.Id && member.UserId == userId).FirstOrDefaultAsync();

        if (member != null) throw new AlreadyMemberException();
        var newMember = new WorkspaceMembers()
        {
            Role = WorkspaceUserRole.User,
            WorkspaceId = workspace.Id,
            UserId = userId
        };
        _dbContext.Add(newMember);
        _dbContext.SaveChanges();
    }

}
