using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dto.Response;
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
        [ProducesResponseType(typeof(ChannelResponse), StatusCodes.Status200OK)]
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

        [HttpGet("{id}/messages"), Authorize]
        [ProducesResponseType(typeof(GetChannelMessagesResponse),StatusCodes.Status200OK)]
        public async Task<IActionResult> GetChannelMessages(int id)
        {
            return Ok(await _channelService.GetChannelMessages(id));
        }

    }
}
