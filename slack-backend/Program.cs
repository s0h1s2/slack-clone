using Microsoft.OpenApi.Models;
using slack_backend.Endpoints;
using FluentValidation;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "Slack Backend" }));
builder.Services.AddCors(options => {});
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
const string V1RoutePrefix="/api/v1";

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Slack Backend");
    });
}

var v1Router = app.MapGroup(V1RoutePrefix);

UsersEndpoint.MapUsersEndpoint(v1Router);


app.Run();
