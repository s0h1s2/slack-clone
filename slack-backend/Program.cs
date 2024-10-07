using Microsoft.OpenApi.Models;
using slack_backend.Endpoints;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { }));
builder.Services.AddCors(options => { });

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PizzaStore API V1");

    });
}

app.MapGet("/", () => "Hello World!");
var v1Router = app.MapGroup("/api/v1");

UsersEndpoint.MapUsersEndpoint(v1Router);


app.Run();
