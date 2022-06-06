using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.DbModels.Configuration;

public class OccupationConfiguration : IEntityTypeConfiguration<Occupation>
{
    public void Configure(EntityTypeBuilder<Occupation> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.OccupationRating)
            .WithMany();
    }
}