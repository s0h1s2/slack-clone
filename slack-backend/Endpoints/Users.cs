using Microsoft.AspNetCore.Mvc;
using slack_backend.Models;

namespace slack_backend.Endpoints;


public static class UsersEndpoint
{

    public static void MapUsersEndpoint(this IEndpointRouteBuilder router)
    {
        router.MapPost("/users", CreateUser).WithRequestValidation<CreateUserDto>();
    }
    [ProducesResponseType(StatusCodes.Status201Created)]
    public static IResult CreateUser([FromBody] CreateUserDto request)
    {
        return TypedResults.Created("User Created!");
    }

}
