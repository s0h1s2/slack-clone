using Microsoft.OpenApi.Models;
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
v1Router.MapGet("/users", () =>
{
    return new User { username = "John" };
});
app.Run();
