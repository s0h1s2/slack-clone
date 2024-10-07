namespace slack_backend.Models;
using FluentValidation;

public class CreateUserDto
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Password { get; set; }

}

public class CreateUserValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserValidator()
    {
        RuleFor(customer => customer.Email).NotEmpty();
        RuleFor(customer => customer.Name).NotEmpty();
        RuleFor(customer => customer.Password).NotEmpty();
    }
}
