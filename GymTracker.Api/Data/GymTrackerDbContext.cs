using Microsoft.EntityFrameworkCore;

public class GymTrackerDbContext(DbContextOptions<GymTrackerDbContext> options) : DbContext(options)
{
    public DbSet<Exercise> Exercises => Set<Exercise>();
}