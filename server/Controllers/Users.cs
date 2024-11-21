using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.Database;
using server.Domain;
using server.Dto;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;
using server.Repository;
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
        [HttpPost("createuser")]
        [ProducesResponseType(typeof(CreateUserResponse),StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails),StatusCodes.Status400BadRequest)]
        public async  Task<IResult> CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                var result=await _usersService.CreateUser(request);
                return TypedResults.CreatedAtRoute(result);
            }
            catch (UserAlreadyExistException)
            {
                return TypedResults.ValidationProblem(new Dictionary<string, string[]>() {{"email",["Email is already been taken"]} });
            }
            
        }

        [HttpPost("auth")]
        public async Task<LoginResponse> Authentication([FromBody] LoginRequest request)
        {
            return await _usersService.LoginUser(request);
            
        }
    }

    
}
