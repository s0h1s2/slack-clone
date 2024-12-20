namespace server.Dto.Response;

public record GetChannel(string Name, int Id);
public record GetMember(int Id, string Name, string? Avatar);

public record GetWorkspaceResponse(int Id, string Name, string JoinCode, bool IsAdmin, List<GetMember> Members);

