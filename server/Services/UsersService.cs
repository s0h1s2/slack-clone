using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Util;
using LoginRequest = server.Dto.Request.LoginRequest;

namespace server.Services;

public class UsersService
{
    private readonly AppDbContext _dbContext;
    private readonly TokenProvider _tokenProvider;
    private readonly PasswordHasher _passwordHasher;

    public UsersService(AppDbContext dbContext, TokenProvider tokenProvider, PasswordHasher passwordHasher)
    {
        _dbContext = dbContext;
        _tokenProvider = tokenProvider;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponse> LoginUser(LoginRequest request)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null) throw new InvalidCredentialsException();
        if (!_passwordHasher.VerifyPassword(request.Password,user.Password)) throw new InvalidCredentialsException();
        
        var token=_tokenProvider.GenerateToken(new User() { Email = user.Email });
        return new LoginResponse(token);
    }
    public async Task<CreateUserResponse> CreateUser(CreateUserRequest request)
    {
        var userExists=_dbContext.Users.FirstOrDefault(u=>u.Email==request.Email);
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
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return new CreateUserResponse(user.Id, user.Email, user.Email);
    }
}