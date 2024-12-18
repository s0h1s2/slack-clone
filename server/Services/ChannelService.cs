using Microsoft.EntityFrameworkCore;
using server.Database;
using server.Dto.Request;
using server.Dto.Response;
using server.Exceptions;

namespace server.Services;

public class ChannelService
{
    private readonly AppDbContext _context;

    public ChannelService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<CreateChannelResponse> CreateChannel(CreateWorkspaceChannelRequest channelRequest,int workspaceId, User user)
    {
        var workspace = await _context.Workspaces.FindAsync(workspaceId);
        if (workspace == null) throw new ResourceNotFound();
        var workspaceMember = await _context.WorkspaceMembers.FirstOrDefaultAsync(m=>m.WorkspaceId == workspaceId && m.UserId == user.Id);
        if(workspaceMember == null) throw new ResourceNotFound();
        if (workspaceMember.Role!=WorkspaceUserRole.Admin) throw new PermmissionException("Only admin channel can create channel");
        var channel = new WorkspaceChannel() { Name = channelRequest.Name, WorkspaceId = workspaceId };
        _context.WorkspaceChannels.Add(channel);
        await _context.SaveChangesAsync();
        return new CreateChannelResponse(channel.Id, channel.Name);
    }
}