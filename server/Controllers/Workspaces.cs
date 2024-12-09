using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dto.Request;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Workspaces : Controller
{
    private readonly WorkspaceService _workspaceService;

    public Workspaces(WorkspaceService workspaceService)
    {
        _workspaceService = workspaceService;
    }
    [HttpPost]
    [Authorize]
    public async Task<IResult> CreateWorkspace(CreateWorkspaceRequest request)
    {
        try
        {
            var result = await _workspaceService.CreateWorkspace(request, "shkaraa@gmail.com");
            return TypedResults.Created("/workspaces/", result);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return TypedResults.BadRequest(ex.Message);
            
        }
       
        
        
    }
}