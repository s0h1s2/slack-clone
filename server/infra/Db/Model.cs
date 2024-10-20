using infra.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace infra.DB;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}