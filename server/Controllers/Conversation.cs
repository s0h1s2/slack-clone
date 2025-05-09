using Microsoft.AspNetCore.Mvc;
using server.Dto.Request;
using server.Exceptions;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Conversation : Controller
{
    private readonly ConversationService _conversationService;

    public Conversation(ConversationService conversationService)
    {
        _conversationService = conversationService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateConversation([FromBody] CreateConversationRequest request)
    {
        try
        {
            await _conversationService.CreateConversation(request);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
            
        }
        
    }
    [HttpPost("/direct/{conversationId}")]
    public async Task<IActionResult> DirectMessage(int conversationId, [FromForm] DirectMessageRequest directMessage)
    {
        try
        {
            await _conversationService.DirectMessage(conversationId, directMessage);
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
}

