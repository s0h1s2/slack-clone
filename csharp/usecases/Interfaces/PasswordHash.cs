namespace usecases.Interfaces;

public interface IPasswordHash
{
    public bool Verify(string passwordHash, string password);
    public string Hash(string password);
}