using Microsoft.EntityFrameworkCore;
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

    public async Task<User?> GetUserByEmail(string email)
    {
        var user=await appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        return user;
    }
}