using Entities.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class OccupationDbContext : DbContext
    {
        public OccupationDbContext(DbContextOptions<OccupationDbContext> options)
        : base(options) { }

        public DbSet<Occupation> Occupations { get; set; }

        public DbSet<OccupationRating> OccupationRatings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Table Configurations
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                modelBuilder.ApplyConfigurationsFromAssembly(assembly);
            }
        }
    }
}
