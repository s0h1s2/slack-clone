using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.Internal;
using Microsoft.AspNetCore.Mvc;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Workspaces : Controller
{
    private readonly WorkspaceService _workspaceService;
    private readonly UsersService _usersService;
    private readonly ChannelService _channelService;

    public Workspaces(WorkspaceService workspaceService, UsersService usersService,ChannelService channelService)
    {
        _workspaceService = workspaceService;
        _usersService = usersService;
        _channelService = channelService;
    }

    [HttpGet("{id}"), Authorize]
    [ProducesResponseType(typeof(GetWorkspaceResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IResult> GetWorkspaces(int id)
    {

        var user = await _usersService.GetAuthenicatedUser();
        if (user == null) return TypedResults.Unauthorized();
        var worksapce = await _workspaceService.GetWorkspace(id, user);
        if (worksapce == null) return TypedResults.NotFound();
        return TypedResults.Ok(worksapce);
    }
    [HttpPost, Authorize]
    [ProducesResponseType(typeof(CreateWorkspaceResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IResult> CreateWorkspace(CreateWorkspaceRequest request)
    {
        try
        {
            var user = await _usersService.GetAuthenicatedUser();
            if (user == null) return TypedResults.Unauthorized();
            var result = await _workspaceService.CreateWorkspace(request, user);
            return TypedResults.Created("/", result);
        }
        catch (Exception ex)
        {
            return TypedResults.BadRequest(ex.Message);
        }

    }

    [HttpGet("my"), Authorize]
    [ProducesResponseType(typeof(GetUserWorkspacesResponse), StatusCodes.Status200OK)]
    public async Task<IResult> GetUserWorkspaces()
    {
        var user = await _usersService.GetAuthenicatedUser();
        var workspaces = await _workspaceService.GetUserWorkspaces(user);

        return TypedResults.Ok(workspaces);
    }
    [HttpDelete("{id}"), Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> DeleteWorkspace(int id)
    {
        var user = await _usersService.GetAuthenicatedUser();
        try
        {
            _workspaceService.DeleteWorkspace(id, user);
            return Ok();
        }
        catch (ResourceNotFound)
        {
            return NotFound();

        }
        catch (PermmissionException)
        {
            return Forbid();
        }
    }
    
    [HttpPost("{id}/channels"), Authorize]
    [ProducesResponseType(typeof(CreateChannelResponse),StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails),StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(PermmissionException),StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateWorkspaceChannel(int id, [FromBody] CreateWorkspaceChannelRequest request)
    {
        var user = await _usersService.GetAuthenicatedUser();
        try
        {
            var channel=await _channelService.CreateChannel(request, id, user!);
            return Created($"/channels/{id}", channel);
        }
        catch (PermmissionException exception)
        {
            return Forbid(exception.Message);
        }
    }
        [HttpGet("{id}/channels"), Authorize]
        [ProducesResponseType(typeof(GetChannelsResponse),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(PermmissionException),StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetWorkspaceChannels(int id, [FromBody] CreateWorkspaceChannelRequest request)
        {
            var user = await _usersService.GetAuthenicatedUser();
            try
            {
                var channels=await _channelService.GetWorkspaceChannels(id, user!);
                return Ok(channels);
            }
            catch (PermmissionException exception)
            {
                return Forbid(exception.Message);
            }
        }
}