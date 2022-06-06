using Entities;
using Entities.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Load db context for API (in-memory database)
builder.Services.AddDbContext<OccupationDbContext>(options => options.UseInMemoryDatabase(databaseName: "TALsample"));

//CORS Policy - allow all origins and methods (left open for testing purposes)
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
        {
            builder.WithOrigins("*")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });

});

//Inject Occupation Repository
builder.Services.AddScoped<IOccupationRepository, OccupationRepository>();

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
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
