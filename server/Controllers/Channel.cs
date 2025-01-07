using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Channel : ControllerBase
    {
        private readonly ChannelService _channelService;

        public Channel(ChannelService channelService)
        {
            _channelService = channelService;
        }

        [HttpGet("{id}"), Authorize]
        [ProducesResponseType(typeof(WorkspaceChannel), 200)]
        public async Task<IActionResult> GetChannel(int id)
        {
            var channel = await _channelService.GetChannel(id);
            return Ok(channel);
        }
    }
}
