using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace infra.db;

public class ApplicationDBContext: DbContext
{
    public DbSet<User> Users { get; set; }

    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name {get; set; }
    }
}

