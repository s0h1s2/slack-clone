using Carter;
using usecases.Dto.Request;
using Usecases.Services;

namespace presentation.Endpoints;

public class UsersModule : CarterModule
{
    UserService _userService;

    public UsersModule(UserService userService) : base("users")
    {
        _userService = userService;
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/", CreateUser);
    }
    private async Task<IResult> CreateUser(CreateUser user)
    {
        await _userService.CreateUser(user);
        return TypedResults.Created("User Created!");
    }
}