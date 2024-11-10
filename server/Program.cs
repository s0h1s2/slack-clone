using FluentValidation;
using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto;
using server.Repository;
using server.Services;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));
builder.Services.AddFluentValidationAutoValidation();
builder.Configuration.AddEnvironmentVariables();
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
