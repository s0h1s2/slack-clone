using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Exceptions;
using server.Hubs;
using server.Services;

namespace server.Controllers;
[ApiController]
[Route("[controller]")]
public class Messages : Controller
{
    private readonly AppDbContext _dbContext;
    private readonly UsersService _usersService;
    private readonly IHubContext<ChannelHub, IChannelHub> _channelHub;

    public Messages(AppDbContext dbContext, UsersService usersService, IHubContext<ChannelHub, IChannelHub> channelHub)
    {
        _dbContext = dbContext;
        _usersService = usersService;
        _channelHub = channelHub;
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
        await _channelHub.Clients.All.DeleteMessage(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMessage(int id, [FromBody] UpdateChatRequest request)
    {
        var userId = _usersService.GetAuthenicatedUserId();
        var message = await _dbContext.Chats.FirstOrDefaultAsync(chat => chat.Id == id);
        if (message == null) return NotFound();
        if (message.UserId != userId) return Forbid();

        message.Message = request.Message;
        message.UpdateAt = DateTime.UtcNow;
        try
        {
            await _channelHub.Clients.Group(message.ChannelId.ToString()).UpdateMessage(message.Id, message.Message, DateTime.UtcNow);

            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return NotFound();
        }
    }
}