using Entities.DbModels;
using Microsoft.Extensions.DependencyInjection;

namespace Entities
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetService<OccupationDBContext>();

            //Populate occupation ratings, if not already populated
            if (!context.OccupationRatings.Any())
            {
                context.OccupationRatings.AddRange(
                    new OccupationRating
                    {
                        Id = 1,
                        Name = "Professional",
                        Factor = 1.0
                    },
                    new OccupationRating
                    {
                        Id = 2,
                        Name = "White Collar",
                        Factor = 1.25
                    },
                    new OccupationRating
                    {
                        Id = 3,
                        Name = "Light Manual",
                        Factor = 1.5
                    },
                    new OccupationRating
                    {
                        Id = 4,
                        Name = "Heavy Manual",
                        Factor = 1.75
                    });
            }

            //populate occupations, if not already populated
            if (!context.Occupations.Any())
            {
                context.Occupations.AddRange(
                    new Occupation
                    {
                        Id = 1,
                        Name = "Cleaner",
                        OccupationRatingId = 3
                    },
                    new Occupation
                    {
                        Id = 2,
                        Name = "Doctor",
                        OccupationRatingId = 1
                    },
                    new Occupation
                    {
                        Id = 3,
                        Name = "Author",
                        OccupationRatingId = 2
                    },
                    new Occupation
                    {
                        Id = 4,
                        Name = "Farmer",
                        OccupationRatingId = 4
                    },
                    new Occupation
                    {
                        Id = 5,
                        Name = "Mechanic",
                        OccupationRatingId = 4
                    },
                    new Occupation
                    {
                        Id = 6,
                        Name = "Florist",
                        OccupationRatingId = 3
                    });
            }

            context.SaveChanges();
        }
    }
}
