using System.Text.Json;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Repository;
using server.Services;
using server.Util;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));

builder.Services.AddFluentValidationAutoValidation(c =>
{
    c.OverrideDefaultResultFactoryWith<FluentValidationErrorsFactory>();
});

builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

builder.Services.AddDbContextPool<AppDbContext>(opt=>opt.UseNpgsql(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository,UserDb>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddCors(c =>
{
  c.AddDefaultPolicy(policy => policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()); 
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors();
app.MapControllers();
app.Run();
