namespace Usecases.Services;
using usecases.Dto.Response;
using usecases.Interfaces;
using Usecases.repository;

public class UserService
{
    private IPasswordHash passwordHash;
    IUserRepository userRepository;
    public UserService(IUserRepository userRepository,IPasswordHash passwordHash)
    {
        this.passwordHash = passwordHash;
        this.userRepository = userRepository;
    }

    public async Task<LoginResponse> LoginUser(string email, string password)
    {
        try
        {
            var user = await userRepository.GetUserByEmail(email);
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



