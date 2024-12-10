using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.Internal;
using Microsoft.AspNetCore.Mvc;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Workspaces : Controller
{
    private readonly WorkspaceService _workspaceService;
    private readonly UsersService _usersService;

    public Workspaces(WorkspaceService workspaceService,UsersService usersService)
    {
        _workspaceService = workspaceService;
        _usersService = usersService;
    }
    [HttpPost,Authorize]
    [ProducesResponseType(typeof(CreateWorkspaceResponse),StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails),StatusCodes.Status400BadRequest)]
    public async Task<IResult> CreateWorkspace(CreateWorkspaceRequest request)
    {
        try
        {
            var user = await _usersService.GetAuthenicatedUser();
            if (user == null) return TypedResults.Unauthorized();
            var result = await _workspaceService.CreateWorkspace(request, user);
            return TypedResults.Created("/",result);
        }
        catch (Exception ex)
        {
            return TypedResults.BadRequest(ex.Message);
        }
        
    }
}