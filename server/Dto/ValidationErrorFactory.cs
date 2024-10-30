using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;

namespace server.Dto;

public record ValidationErrorsResponse(string Name,string Description);
public class ValidationErrorFactory : IFluentValidationAutoValidationResultFactory
{
    public IActionResult CreateActionResult(ActionExecutingContext context, ValidationProblemDetails? validationProblemDetails)
    {
            var errors= validationProblemDetails?.Errors.Select(p => new ValidationErrorsResponse(p.Key,p.Value.First()));
            var result = new BadRequestObjectResult(errors);
            return result;
    }
}

