namespace server.Dto.Request;

public record DirectMessageRequest(int Receiver, string Message, IFormFile? File);