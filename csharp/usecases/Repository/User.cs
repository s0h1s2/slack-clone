using Usecases.Entites;

namespace Usecases.repository;


public interface IUserRepository
{
    Task<User> GetUserByEmail(string email);
}