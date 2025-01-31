using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using server.Database;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;
using Util;


namespace server.Util;

public class TokenProvider(IConfiguration configuration)
{
    public string GenerateToken(User user)
    {
        var key = configuration.GetValue<string>("Jwt:Key");
        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(CustomClaims.UserId, user.Id.ToString()),
            ]),
            Expires = DateTime.UtcNow.AddMinutes(60),
            Issuer = configuration.GetValue<string>("Jwt:Issuer"),
            SigningCredentials = credentials
        };
        var tokenHandler = new JsonWebTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return token;
    }

}
