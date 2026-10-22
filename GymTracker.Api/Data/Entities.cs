public class Exercise
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Image { get; set; }
}

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }

}