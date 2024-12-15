using server.Database;

namespace server.Dto.Response;

public record GetWorkspaceResponse(int Id, string Name, string JoinCode, WorkspaceUserRole UserRole);
