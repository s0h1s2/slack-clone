using server.Domain;

namespace server.Repository;

public interface IUserRepository
{
    public Task<User> SaveUser(User user);
    public Task<User?> GetUserByEmail(string email);
}