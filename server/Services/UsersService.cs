using server.Database;
using server.Domain;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Repository;

namespace server.Services;

public class UsersService
{
    private readonly IUserRepository _userRepository;

    public UsersService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<CreateUserResponse> CreateUser(CreateUserRequest request)
    {
        var userExists=await _userRepository.GetUserByEmail(request.Email);
        if (userExists!= null)
        {
            throw new UserAlreadyExistException();
        }
        var user = new User
        {
            Email = request.Email,
            Name = request.Name,
            Password = request.Password,
        };
        var result=await _userRepository.SaveUser(user);
        return new CreateUserResponse
        {
            Email = result.Email,
            Name = result.Name,
            UserId =   result.UserId
        } ;
    }
}