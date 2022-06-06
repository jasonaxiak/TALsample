using Entities.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Entities.Repository;

public class OccupationRepository : IOccupationRepository
{
    private readonly OccupationDbContext _context;

    public OccupationRepository(OccupationDbContext dbContext)
    {
        _context = dbContext;
    }

    public List<Occupation> GetOccupations()
    {
        return _context.Occupations.ToList();
    }

    public OccupationRating? GetOccupationRating(int occupationId)
    {
        return _context.Occupations
                .Include(i => i.OccupationRating)
                .AsNoTracking()
                .Select(o => o.OccupationRating)
                .FirstOrDefault(o => o.Id == occupationId);
    }
}