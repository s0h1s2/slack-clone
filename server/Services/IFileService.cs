namespace server.Services;

public interface IFileService
{
    public Task<string> UploadFileAsync(IFormFile file);
    public Task<string> GetFileUrlAsync(string fileId);
}
