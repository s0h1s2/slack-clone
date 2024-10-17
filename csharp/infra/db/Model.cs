using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace infra.db;

public class ApplicationContext: DbContext
{
    public DbSet<User> Users { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
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

