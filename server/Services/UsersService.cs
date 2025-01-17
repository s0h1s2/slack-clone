using System.Security.Claims;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Util;
using Util;
using LoginRequest = server.Dto.Request.LoginRequest;

namespace server.Services;

public class UsersService
{
    private readonly AppDbContext _dbContext;
    private readonly TokenProvider _tokenProvider;
    private readonly PasswordHasher _passwordHasher;
    IHttpContextAccessor _httpContextAccessor;
    public UsersService(AppDbContext dbContext, TokenProvider tokenProvider, PasswordHasher passwordHasher, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _tokenProvider = tokenProvider;
        _passwordHasher = passwordHasher;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<LoginResponse> LoginUser(LoginRequest request)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null) throw new InvalidCredentialsException();
        if (!_passwordHasher.VerifyPassword(request.Password, user.Password)) throw new InvalidCredentialsException();

        var token = _tokenProvider.GenerateToken(user);
        return new LoginResponse(token);
    }
    public async Task<CreateUserResponse> CreateUser(CreateUserRequest request)
    {
        var userExists = _dbContext.Users.FirstOrDefault(u => u.Email == request.Email);
        if (userExists != null)
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

    public async Task<User?> GetAuthenicatedUser()
    {
        string email = String.Empty;
        if (_httpContextAccessor.HttpContext.User is not null)
        {
            email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }
        return null;
    }
    public int GetAuthenicatedUserId()
    {
        if (_httpContextAccessor.HttpContext.User is not null)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(CustomClaims.UserId);
            if (userId is null) throw new Exception("Invalid user id");
            return Int32.Parse(userId);
        }
        throw new Exception("Invalid user id");

    }
}
