using System.Configuration;
using System.Text;
using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Database;
using server.Services;
using server.Util;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));
builder.Services.AddAuthorization();

builder.Services.AddFluentValidationAutoValidation(c =>
{
    c.OverrideDefaultResultFactoryWith<FluentValidationErrorsFactory>();
});

builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(c =>
{
    c.RequireHttpsMetadata = false;
    c.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key") ?? throw new InvalidOperationException())),
        ValidateAudience = false,
        ValidateIssuer =   false,
        
    };
});
builder.Services.AddDbContextPool<AppDbContext>(opt=>opt.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddControllers();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<WorkspaceService>();
builder.Services.AddSingleton<PasswordHasher>();

builder.Services.AddCors(c =>
{
  c.AddDefaultPolicy(policy => policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()); 
});
builder.Services.AddSingleton<TokenProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
