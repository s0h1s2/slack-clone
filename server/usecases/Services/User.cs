using usecases.Dto.Request;
using usecases.Dto.Response;
using Usecases.Entites;
using Usecases.exceptions;
using usecases.Interfaces;
using Usecases.repository;

namespace Usecases.Services;

public class UserService
{
    private IPasswordHash _passwordHash;
    private IUserRepository _userRepository;

    public UserService(IUserRepository userRepository, IPasswordHash passwordHash)
    {
        _passwordHash = passwordHash;
        _userRepository = userRepository;
    }

    public async Task CreateUser(CreateUser userDto)
    {
        var user=await _userRepository.GetUserByEmail(userDto.Email);
        if (user != null)
        {
            throw new EntityAlreadyExist("Email already exists. Please try another one.");
        }
        var hashedPassword=_passwordHash.Hash(userDto.Password);
        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Email = userDto.Email,
            Name = userDto.Name,
            HashedPassword = hashedPassword,
        };
        _userRepository.SaveUser(newUser);
    }

    public async Task<LoginResponse> LoginUser(string email, string password)
    {
        try
        {
            var user = await _userRepository.GetUserByEmail(email);
            var result = _passwordHash.Verify(user.HashedPassword, password);
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