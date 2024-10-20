using Microsoft.EntityFrameworkCore;
using Usecases.Entites;
using Usecases.exceptions;
using Usecases.repository;

namespace infra.db;
public class UserRepository: IUserRepository
{
    private ApplicationDBContext _dbContext;
    public UserRepository(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<User> GetUserByEmail(string email)
    {
        var user=await _dbContext.Users.FirstOrDefaultAsync(u => u.Email==email);
        if (user == null) throw new EntityNotFound();
        return new User
        {
            Email = user.Email,
            HashedPassword = user.Password,
            Name =user.Name
        };
    }
}