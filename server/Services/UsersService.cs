using server.Dto.Request;
using server.Dto.Response;
using server.Repository;

namespace server.Services;

public class UsersService
{
    private readonly IUserRepository _userRepository;

    public UsersService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public CreateUserResponse CreateUser(CreateUserRequest request)
    {
        
    }
}