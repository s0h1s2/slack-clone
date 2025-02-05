using Microsoft.EntityFrameworkCore;
using server.Database;

namespace server.Services;

public class MemberService
{
    private readonly UsersService _usersService;
    private readonly AppDbContext _dbContext;

    public MemberService(UsersService usersService,AppDbContext _dbContext)
    {
        _usersService = usersService;
        this._dbContext = _dbContext;
    }

    public async Task<bool> IsUserAWorkspaceMember(int workspace)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var channel =await _dbContext.WorkspaceMembers
            .Where((member) => member.WorkspaceId==workspace && member.UserId==userId)
            .FirstOrDefaultAsync();
        
        return channel is not null;
    }
    
}