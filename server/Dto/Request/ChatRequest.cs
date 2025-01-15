using FluentValidation;

public class ChatMessageRequest
{
    public string Chat { get; set; }
    public IFormFile? Attachment { get; set; }
};

public class ChatMessageValidation : AbstractValidator<ChatMessageRequest>
{
    public ChatMessageValidation()
    {
        RuleFor(x => x.Chat).NotEmpty();
    }
}
