using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Database;
using server.Domain;
using server.Dto.Request;
using server.Dto.Response;
using server.Repository;

namespace server.Controllers
{
    [Route("api/[controller]/")]
    [Produces("application/json")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public Users(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        [HttpPost("createuser")]
        [ProducesResponseType(typeof(CreateUserResponse),StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async  Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
            };
            var result=await _userRepository.SaveUser(user);
            return CreatedAtAction(nameof(CreateUser), user.UserId,new CreateUserResponse { UserId = result.UserId,Email = result.Email,Name = result.Name});
        }

        // PUT api/<Users>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Users>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    
}
