using Microsoft.EntityFrameworkCore;

namespace server.Database;

public class AppDbContext:DbContext
{
    public DbSet<User> Users{get;set;}

}