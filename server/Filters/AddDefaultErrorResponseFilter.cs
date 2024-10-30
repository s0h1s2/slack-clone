using Microsoft.OpenApi.Models;
using server.Dto;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace server.Filters;

public class AddDefaultErrorResponseFilter:IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Responses.TryGetValue("400", out var response))
        {
            response.Content["application/json"].Schema=context.SchemaGenerator.GenerateSchema(typeof(IEnumerable<ValidationErrorsResponse>),context.SchemaRepository);
        }
    }
}