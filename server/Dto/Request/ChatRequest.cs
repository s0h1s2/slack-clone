using FluentValidation;
using server.Services;

public class ChatMessageRequest
{
    public string Chat { get; set; }
    public IFormFile? Attachment { get; set; }
    
    public int? ParentId { get; set; }
    
    public ChatHandlerType ChatType { get; set; }
    
};

public class ChatMessageValidation : AbstractValidator<ChatMessageRequest>
{
    public ChatMessageValidation()
    {
        RuleFor(x => x.Chat).NotEmpty();
    }
}
