using FluentValidation;

public record ChatMessageRequest(string Chat, IFormFile? Attachment);
public class ChatMessageValidation : AbstractValidator<ChatMessageRequest>
{
    public ChatMessageValidation()
    {
        RuleFor(x => x.Chat).NotEmpty();
    }
}
