using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.DbModels.Configuration;

public class OccupationRatingConfiguration : IEntityTypeConfiguration<OccupationRating>
{
    public void Configure(EntityTypeBuilder<OccupationRating> builder)
    {
        builder.HasKey(e => e.Id);
    }
}