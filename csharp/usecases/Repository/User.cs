using usecases.Entites;

namespace usecases.repository;


public interface IUserRepository
{
    User GetUserByEmail(string email);
    
}