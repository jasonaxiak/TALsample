using Entities;
using Microsoft.AspNetCore.Mvc;

namespace TALsampleAPI.Controllers
{
    [Route("api/occupation")]
    [ApiController]
    public class OccupationController : Controller
    {
        private readonly OccupationDBContext _context;

        public OccupationController(OccupationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var occupations = _context.Occupations.ToList();
            return Ok(occupations);
        }
    }
}
