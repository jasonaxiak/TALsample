using Entities.Models;
using Entities.Repository;
using Microsoft.AspNetCore.Mvc;

namespace TALsampleAPI.Controllers
{
    [Route("api/quotes")]
    [ApiController]
    public class QuoteController : Controller
    {
        private readonly IOccupationRepository _repository;

        public QuoteController(IOccupationRepository repository)
        {
            _repository = repository;
        }

        // POST: QuoteController
        [HttpPost]
        public IActionResult Index(Quote quote)
        {
            //(Death Cover amount * Occupation Rating Factor * Age) /1000 * 12

            var occupationRating = _repository.GetOccupationRating(quote.OccupationId);

            if (occupationRating == null)
                return NotFound($"Unable to find occupation rating for occupation id {quote.OccupationId}");

            quote.Premium = (quote.SumInsured * occupationRating.Factor * quote.Age) / 1000 * 12;

            return Ok(quote);
        }
        
    }
}
