namespace server.Dto.Request;

public record CreateUserRequest(string Name, string Email, string Password);