using server.Repository;

namespace server.Database;

public class UserDb(AppDbContext appDbContext) : IUserRepository
{
    public async Task<User> SaveUser(User user)
    {
        var userResult=appDbContext.Users.Add(user);
        await appDbContext.SaveChangesAsync();
        return userResult.Entity;
    }
}