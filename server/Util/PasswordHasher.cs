using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

namespace server.Util;

public sealed class PasswordHasher
{
    private const int SaltByteSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 10000;
    public string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltByteSize);
        byte[] hashedPassword = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithmName.SHA256, HashSize);
        return $"{Convert.ToHexString(hashedPassword)}-{Convert.ToHexString(salt)}";

    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        string[] parts = hashedPassword.Split('-');
        if (parts.Length != 2) return false;
        byte[] hash = Convert.FromHexString(parts[0]);
        byte[] salt = Convert.FromHexString(parts[1]);

        byte[] rawPasswordHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithmName.SHA256, HashSize);
        return CryptographicOperations.FixedTimeEquals(rawPasswordHash, hash);

    }
}