namespace slack_backend.Models;
using FluentValidation;

public record CreateUserDto(string Email, string Name, string Password);

public class CreateUserValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserValidator()
    {
        RuleFor(customer => customer.Email).NotEmpty();
        RuleFor(customer => customer.Name).NotEmpty();
        RuleFor(customer => customer.Password).NotEmpty();
    }
}
