using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    public Workspaces(WorkspaceService workspaceService, UsersService usersService, ChannelService channelService)
    {
        _workspaceService = workspaceService;
        _usersService = usersService;
        _channelService = channelService;
    }

    [HttpGet("{id}"), Authorize]
    [ProducesResponseType(typeof(GetWorkspaceResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IResult> GetWorkspaceById(int id)
    {
        var worksapce = await _workspaceService.GetWorkspace(id);
        if (worksapce == null) return TypedResults.NotFound();
        return TypedResults.Ok(worksapce);
    }
    [HttpGet("{id}/public-info"), Authorize]
    [ProducesResponseType(typeof(GetWorkspacePublicInfoResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IResult> GetWorkspacePublicInfo(int id)
    {
        var workspace = await _workspaceService.GetWorkspacePublicInfo(id);
        if (workspace== null) return TypedResults.NotFound();
        return TypedResults.Ok(workspace);
    }
    [HttpPost, Authorize]
    [ProducesResponseType(typeof(CreateWorkspaceResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IResult> CreateWorkspace(CreateWorkspaceRequest request)
    {
        try
        {
            var result = await _workspaceService.CreateWorkspaceWithGeneralChannel(request);
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
        var workspaces = await _workspaceService.GetUserWorkspaces();
        return TypedResults.Ok(workspaces);
    }
    [HttpDelete("{id}"), Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> DeleteWorkspace(int id)
    {
        try
        {
            _workspaceService.DeleteWorkspace(id);
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
    [ProducesResponseType(typeof(CreateChannelResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateWorkspaceChannel(int id, [FromBody] CreateWorkspaceChannelRequest request)
    {
        try
        {
            var channel = await _channelService.CreateChannel(request, id);
            return Created($"/channels/{id}", channel);
        }
        catch (PermmissionException exception)
        {
            return Forbid();
        }
    }
    [HttpGet("{id}/channels"), Authorize]
    [ProducesResponseType(typeof(GetChannelsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetWorkspaceChannels(int id)
    {
        try
        {
            var channels = await _channelService.GetWorkspaceChannels(id);
            return Ok(channels);
        }
        catch (PermmissionException exception)
        {
            return Forbid(exception.Message);
        }
    }
    [HttpPost("{id}/join-code"), Authorize]
    [ProducesResponseType(typeof(JoinCodeResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> NewWorkspaceJoinCode(int id)
    {
        var user = await _usersService.GetAuthenicatedUser();
        try
        {
            var result = await _workspaceService.GenerateWorkspaceNewJoinCode(id);
            return Ok(result);
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
    [HttpPost("{id}/join"), Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> JoinWorkspaceForCurrentUser(int id,[FromBody] JoinWorkspaceRequest joinCodeRequest)
    {
        try
        {
            var user = await _usersService.GetAuthenicatedUser();
            _workspaceService.JoinWorkspace(id,joinCodeRequest);
            return Ok();
        }
        catch (AlreadyMemberException) {
           return BadRequest(new ValidationProblemDetails{Errors=new Dictionary<string,string[]>{{"joinCode",new string[]{"You already member of this workspace"}}}});
        }
        catch(InvalidJoinCodeException){
           return BadRequest(new ValidationProblemDetails{Errors=new Dictionary<string,string[]>{{"joinCode",new string[]{"Invalid join code"}}}});
        }
        catch (ResourceNotFound) {
          return NotFound();
        }
    }
}
