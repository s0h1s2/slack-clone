using Microsoft.AspNetCore.Identity.Data;
using server.Database;
using server.Domain;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Repository;
using server.Util;
using LoginRequest = server.Dto.Request.LoginRequest;

namespace server.Services;

public class UsersService
{
    private readonly IUserRepository _userRepository;
    private readonly TokenProvider _tokenProvider;
    private readonly PasswordHasher _passwordHasher;

    public UsersService(IUserRepository userRepository,TokenProvider tokenProvider,PasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _tokenProvider = tokenProvider;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponse> LoginUser(LoginRequest request)
    {
        var user=await _userRepository.GetUserByEmail(request.Email);
        if (user == null) throw new InvalidCredentialsException();
        if (!_passwordHasher.VerifyPassword(request.Password,user.Password)) throw new InvalidCredentialsException();
        
        var token=_tokenProvider.GenerateToken(new User() { Email = user.Email });
        return new LoginResponse(token);
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
            Password = _passwordHasher.HashPassword(request.Password),
        };
        var result=await _userRepository.SaveUser(user);
        return new CreateUserResponse
        {
            Email = result.Email,
            Name = result.Name,
            UserId =   result.UserId
        };
        
    }
}