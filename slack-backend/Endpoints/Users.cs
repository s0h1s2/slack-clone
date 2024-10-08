using Microsoft.AspNetCore.Mvc;
using slack_backend.Models;

namespace slack_backend.Endpoints;


public static class UsersEndpoint
{

    public static void MapUsersEndpoint(this IEndpointRouteBuilder router)
    {
        router.MapPost("/users", CreateUser);
    }
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(CreateUserDto), StatusCodes.Status422UnprocessableEntity)]
    public static IResult CreateUser([FromBody] CreateUserDto request)
    {
        CreateUserValidator validation = new CreateUserValidator();
        var result = validation.Validate(request);
        if (!result.IsValid)
        {
            return TypedResults.UnprocessableEntity(result.Errors);
        }
        return TypedResults.Created("User Created!");
    }

}
