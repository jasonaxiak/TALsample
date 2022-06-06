using Entities.DbModels;

namespace Entities.Repository;

public interface IOccupationRepository
{
    List<Occupation> GetOccupations();

    OccupationRating? GetOccupationRating(int occupationId);
}