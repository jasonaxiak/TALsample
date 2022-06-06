
namespace Entities.DbModels
{
    public class Occupation
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int OccupationRatingId { get; set; }

        public OccupationRating OccupationRating { get; set; }
    }
}
