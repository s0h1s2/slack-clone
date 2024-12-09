using Microsoft.EntityFrameworkCore;

namespace server.Database;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users{get;init;}
    public DbSet<Workspace> Workspaces{get;init;}
    
}
