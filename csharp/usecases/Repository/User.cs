using Usecases.Entites;

namespace Usecases.repository;


public interface IUserRepository
{
    User GetUserByEmail(string email);
}