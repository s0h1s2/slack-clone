using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;

namespace server.Dto;
record Errors(string Name,string Description);
public class ValidationErrorFactory : IFluentValidationAutoValidationResultFactory
{
    public IActionResult CreateActionResult(ActionExecutingContext context, ValidationProblemDetails? validationProblemDetails)
    {
        var errros = validationProblemDetails.Errors.Select(p => new Errors(p.Key,p.Value.First()));
        return new BadRequestObjectResult(errros);
    }
}

