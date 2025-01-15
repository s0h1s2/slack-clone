using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class Channel : ControllerBase
    {
        private readonly ChannelService _channelService;

        public Channel(ChannelService channelService)
        {
            _channelService = channelService;
        }

        [HttpGet("{id}"), Authorize]
        [ProducesResponseType(typeof(ChannelResponse), 200)]
        public async Task<IActionResult> GetChannel(int id)
        {
            var channel = await _channelService.GetChannel(id);
            return Ok(channel);
        }
        [HttpPost("{id}/chat"), Authorize]
        [Consumes("multipart/form-data")]
        // [ProducesResponseType(200)]
        public async Task<IActionResult> ChatChannel([FromRoute]int id,[FromForm] ChatMessageRequest chatRequest)
        {
            await _channelService.ChatChannel(id, chatRequest);
          return Ok();
        }


    }
}
