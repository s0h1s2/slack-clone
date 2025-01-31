using System.IO.Pipes;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;

namespace server.Util;

public class FluentValidationErrorsFactory : IFluentValidationAutoValidationResultFactory
{
    public IActionResult CreateActionResult(ActionExecutingContext context, ValidationProblemDetails? validationProblemDetails)
    {
        var errors = validationProblemDetails.Errors.Select(pair => new KeyValuePair<string, string[]>(pair.Key.ToLower(), pair.Value))
            .ToDictionary(t => t.Key.ToLower(), t => t.Value);
        var validationResult = new ValidationProblemDetails
        {
            Errors = errors,
            Title = validationProblemDetails.Title,
            Detail = validationProblemDetails.Detail,
            Extensions = validationProblemDetails.Extensions,
            Instance = validationProblemDetails.Instance,
            Status = validationProblemDetails.Status,
            Type = validationProblemDetails.Type
        };
        return new BadRequestObjectResult(validationResult);
    }
}