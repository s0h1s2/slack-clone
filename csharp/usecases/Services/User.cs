using Usecases.Entites;
using Usecases.repository;

namespace Usecases.Services;

public class UserService
{
    private IPasswordHash passwordHash;
    IUserRepository userRepository;
    public UserService(IUserRepository userRepository,IPasswordHash passwordHash)
    {
        this.passwordHash = passwordHash;
        this.userRepository = userRepository;
    }

    public LoginResponse LoginUser(string email, string password)
    {
        try
        {
            var user = userRepository.GetUserByEmail(email);
            var result=passwordHash.Verify(user.HashedPassword,password);
            if (result)
            {
                return new LoginResponse
                {
                    AccessToken="Some access toke here",
                    RefreshToken = "Some refresh token here"
                };
            }
            throw new exceptions.EntityNotFound();
        }
        catch (exceptions.EntityNotFound e)
        {
            throw;
        }
        catch (Exception e)
        {
            // ignored
        }

        return null;
    }
}

public interface IPasswordHash
{
    public bool Verify(string passwordHash, string password);
}

public class LoginResponse
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}

