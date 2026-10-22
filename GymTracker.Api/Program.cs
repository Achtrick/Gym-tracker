using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureHttpJsonOptions(o =>
o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddDbContext<GymTrackerDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("GymTrackerDb")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/exercises", async (GymTrackerDbContext db) =>
    await db.Exercises.AsNoTracking().ToListAsync());

app.MapPost("/exercises", async (GymTrackerDbContext db, Exercise exercise) =>
{
    db.Exercises.Add(exercise);
    await db.SaveChangesAsync();
    return Results.Created($"/exercises/{exercise.Id}", exercise);
});

app.Run();

