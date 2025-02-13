namespace server.Dto.Request;

public record DirectMessageRequest(int ReceiverId, string Message, IFormFile File);