using usecases.Dto.Response;
using Usecases.exceptions;
using usecases.Interfaces;
using Usecases.repository;

namespace Usecases.Services;

public class UserService
{
    private readonly IPasswordHash passwordHash;
    private readonly IUserRepository userRepository;

    public UserService(IUserRepository userRepository, IPasswordHash passwordHash)
    {
        this.passwordHash = passwordHash;
        this.userRepository = userRepository;
    }

    public async void CreateUser(string username, string name, string password)
    {
    }

    public async Task<LoginResponse> LoginUser(string email, string password)
    {
        try
        {
            var user = await userRepository.GetUserByEmail(email);
            var result = passwordHash.Verify(user.HashedPassword, password);
            if (result)
                return new LoginResponse
                {
                    AccessToken = "Some access toke here",
                    RefreshToken = "Some refresh token here"
                };
            throw new EntityNotFound();
        }
        catch (EntityNotFound e)
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