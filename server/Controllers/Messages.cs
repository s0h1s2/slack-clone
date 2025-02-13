using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
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
    private readonly MemberService _memberService;
    private readonly IFileService _fileService;

    public Messages(AppDbContext dbContext, UsersService usersService, IHubContext<ChannelHub, IChannelHub> channelHub, MemberService memberService, IFileService fileService)
    {
        _dbContext = dbContext;
        _usersService = usersService;
        _channelHub = channelHub;
        _memberService = memberService;
        _fileService = fileService;
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
        await _channelHub.Clients.Group(message.ChannelId.ToString()).DeleteMessage(message.Id);

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
            await _dbContext.SaveChangesAsync();
            await _channelHub.Clients.Group(message.ChannelId.ToString()).UpdateMessage(message.Id, message.Message, DateTime.UtcNow);
            return Ok();
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    [HttpGet("{id}/thread/{workspaceId}")]
    [ProducesResponseType(typeof(GetChannelMessagesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetThreadMessages(int id, int workspaceId)
    {
        var isMember = await _memberService.IsUserAWorkspaceMember(workspaceId);
        if (!isMember) return Forbid();

        // load message whose parents are id
        var messages = await _dbContext.Chats
            .Include((ch) => ch.User)
            .Include((ch) => ch.Channel)
            .Where(ch => ch.ParentId == id)
            .OrderByDescending((chat) => chat.CreatedAt)
            .ToListAsync();
        var messagesResult = new List<ChannelMessageResponse>();
        foreach (var message in messages)
        {
            var result = await ChannelMessageResponse.FromChat(message, _fileService);
            messagesResult.Add(result);
        }

        return Ok(new GetChannelMessagesResponse(messagesResult,
            messagesResult.Count > 0 ? messagesResult.Last().Id : null));

    }
}