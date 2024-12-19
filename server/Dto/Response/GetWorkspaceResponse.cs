using System.Security.Cryptography;
using server.Database;

namespace server.Dto.Response;

public record GetChannel(string Name, int Id);

public record GetWorkspaceResponse(int Id, string Name, string JoinCode, bool IsAdmin,List<GetChannel> Channels);
