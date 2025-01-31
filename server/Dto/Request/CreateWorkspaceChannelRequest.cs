using FluentValidation;

namespace server.Dto.Request;

public record CreateWorkspaceChannelRequest(string Name);

public class CreateChannelValidation : AbstractValidator<CreateWorkspaceRequest>
{
    public CreateChannelValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MinimumLength(5);
    }

}