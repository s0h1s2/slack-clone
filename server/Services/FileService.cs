namespace server.Services;

using Appwrite;
using Appwrite.Models;
using Appwrite.Services;
using Supabase;
using FileOptions = Supabase.Storage.FileOptions;

public class FileService : IFileService
{
    // private readonly IConfiguration _configuration;
    private readonly Supabase.Client _client;
    public FileService(IConfiguration config)
    {   
        _client=new Supabase.Client(config["SupabaseUrl"],config["SupabaseSecret"],new SupabaseOptions{AutoConnectRealtime = false});
    }
    public async Task<string> UploadFileAsync(IFormFile formFile)
    {
        await using var stream=formFile.OpenReadStream();
        byte[] fileBytes= new byte[formFile.Length];
        await stream.ReadExactlyAsync(fileBytes, 0, fileBytes.Length);
        var fileId=await _client.Storage.From("slack-clone").Upload(fileBytes,string.Format("${0}.${1}",Guid.NewGuid(),Path.GetExtension(formFile.FileName)) ,new FileOptions{ContentType = formFile.ContentType,Upsert = false});
        return fileId;
    }

    public Task<string> GetFileUrlAsync(string fileId)
    {
        return Task.FromResult(_client.Storage.From("slack-clone").GetPublicUrl(fileId));
    }
}
