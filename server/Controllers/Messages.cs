using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Exceptions;
using server.Services;

namespace server.Controllers;
[ApiController]
[Route("[controller]")]
public class Messages : Controller
{
    private readonly AppDbContext _dbContext;
    private readonly UsersService _usersService;
    public Messages(AppDbContext dbContext, UsersService usersService)
    {
        _dbContext = dbContext;
        _usersService = usersService;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var message = await _dbContext.Chats.FindAsync(id);
        if (message == null) return NotFound();
        if (message.UserId != userId) return Forbid();
        _dbContext.Chats.Remove(message);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateMessage(int id, [FromBody] string body)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var message = await _dbContext.Chats.FindAsync(id);
        if (message == null) return NotFound(); 
        if (message.UserId != userId) return Forbid();
        message.Message= body;
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
}