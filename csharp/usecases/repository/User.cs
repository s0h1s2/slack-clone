using usecases.entites;

namespace usecases.repository;


public interface IUserRepository
{
    User GetUserByEmail(string email);
    
}