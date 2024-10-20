using System.ComponentModel.DataAnnotations;

namespace infra.Db.Models;

public class User
{
    [Key] public int Id { get; set; }

    public Guid Guid { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
}