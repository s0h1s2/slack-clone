namespace usecases.Dto.Request;

public abstract record CreateUser(string Name, string Email, string Password);
