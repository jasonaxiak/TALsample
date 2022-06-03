using Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<OccupationDBContext>(options => options.UseInMemoryDatabase(databaseName: "TALsample"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Seed in-memory DB
using (var scope = app.Services.CreateScope())
{
    DataGenerator.Initialize(scope.ServiceProvider);
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
