using server.Database;

namespace server.Repository;

public interface IUserRepository
{
    public Task<User> SaveUser(User user);
}