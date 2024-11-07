using Microsoft.EntityFrameworkCore;
using server.Domain;

namespace server.Database;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users{get;set;}
}