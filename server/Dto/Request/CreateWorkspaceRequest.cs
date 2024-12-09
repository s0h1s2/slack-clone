using FluentValidation;

namespace server.Dto.Request;

public record CreateWorkspaceRequest(string Name);

public class CreateWorkspaceValidation:AbstractValidator<CreateWorkspaceRequest>{
    public CreateWorkspaceValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MinimumLength(5);
        
    }
}