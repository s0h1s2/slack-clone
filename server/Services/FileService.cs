using Appwrite;
using Appwrite.Models;
using Appwrite.Services;

public class FileService : IFileService
{
    private readonly Client _client;
    // private readonly IConfiguration _configuration;
    FileService(IConfiguration _configuration)
    {
      var bucketConfig=_configuration.GetSection("AppWriteBucket");
      _client=new Client().SetEndpoint(bucketConfig.Get("ApiUrl"));

    }
    public async Task<string> UploadFileAsync(IFormFile file)
    {
      
    }
}
