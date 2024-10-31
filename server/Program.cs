using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using server.Database;
using server.Dto;
using server.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Interceptors;
using Swashbuckle.AspNetCore.SwaggerGen;
using JsonSerializer = System.Text.Json.JsonSerializer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddFluentValidationAutoValidation(c =>
{
    c.OverrideDefaultResultFactoryWith<ValidationErrorFactory>();
});
builder.Services.AddSwaggerGen(c =>
{   
    c.OperationFilter<AddDefaultErrorResponseFilter>();
});

builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddDbContextPool<AppDbContext>(opt=>opt.UseNpgsql(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
