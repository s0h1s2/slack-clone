using FluentValidation;

namespace server.Dto.Request;

public record UpdateChatRequest(string Message);
public class ChatMessageValidation : AbstractValidator<UpdateChatRequest>
{
    public ChatMessageValidation()
    {
        RuleFor(x => x.Message).NotEmpty();
    }
}
