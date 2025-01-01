using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly UsersService _usersService;

        public Users(UsersService usersService)
        {
            _usersService = usersService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(CreateUserResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IResult> CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                var result = await _usersService.CreateUser(request);
                return TypedResults.CreatedAtRoute(result);
            }
            catch (UserAlreadyExistException)
            {
                return TypedResults.ValidationProblem(new Dictionary<string, string[]>() { { "email", ["Email is already been taken"] } });
            }

        }

        [HttpPost("auth")]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IResult> Authentication([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _usersService.LoginUser(request);
                return TypedResults.Ok(token);
            }
            catch (InvalidCredentialsException)
            {
                return TypedResults.Unauthorized();
            }

        }
        [HttpGet("me"),Authorize]
        [ProducesResponseType(typeof(MeResponse),StatusCodes.Status200OK)]

        public async Task<IActionResult> Me()
        {
            var user=await _usersService.GetAuthenicatedUser();
            return Ok(new MeResponse(user.Name,user.Email));
        }
    }


}
