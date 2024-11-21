// using Moq;
// using NUnit.Framework;
// using server.Domain;
// using server.Dto.Request;
// using server.Exceptions;
// using server.Repository;
// using server.Services;
//
// namespace server.Tests;
// public class UsersTest
// {
//     [Test]
//     public void TestIfUserAlreadyExists_UserExists_ThrowsException()
//     {
//         var email = "test@test.com";
//         var user = new User { Email = email };
//         var mockRepo = new Mock<IUserRepository>();
//         mockRepo.Setup(repo => repo.GetUserByEmail(email)).ReturnsAsync(user);
//         var userService = new UsersService(mockRepo.Object);
//         Assert.ThrowsAsync<UserAlreadyExistException>(()=>userService.CreateUser(new CreateUserRequest("john",email,"password")));
//     }
//     
// }
