using System.Net;
using Carter;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.Dto.Response;

namespace server.Endpoints;

public class UsersModule:CarterModule
{
    public UsersModule():base("/users")
    {
        
    }
    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/{id}", () => TypedResults.Ok("Hello,World")).WithTags("Users");
        app.MapPost("/", CreateUser).WithTags("Users");
        app.MapPut("/{id}", () => TypedResults.Ok("Hello,World")).WithTags("Users");
        app.MapDelete("/{id}", () => TypedResults.Ok("Hello,World")).WithTags("Users");
    }

    private static IResult CreateUser()
    {
        return TypedResults.CreatedAtRoute(new CreateUserResponse{});
    }
}