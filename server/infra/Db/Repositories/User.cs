using Microsoft.EntityFrameworkCore;
using Usecases.Entites;
using Usecases.exceptions;
using Usecases.repository;

namespace infra.DB;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDBContext _dbContext;

    public UserRepository(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) throw new EntityNotFound();
        return new User
        {
            Id = user.Guid,
            Email = user.Email,
            HashedPassword = user.Password,
            Name = user.Name
        };
    }

    public async void SaveUser(User user)
    {
        var newUser = new Db.Models.User
        {
            Name = user.Name,
            Guid = user.Id,
            Email = user.Email,
            Password = user.HashedPassword
        };
        await _dbContext.Users.AddAsync(newUser);
    }
}