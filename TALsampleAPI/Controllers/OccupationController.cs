﻿using Entities;
using Entities.Repository;
using Microsoft.AspNetCore.Mvc;

namespace TALsampleAPI.Controllers
{
    [Route("api/occupations")]
    [ApiController]
    public class OccupationController : Controller
    {
        private readonly IOccupationRepository _repository;

        public OccupationController(IOccupationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var occupations = _repository.GetOccupations();
            return Ok(occupations);
        }
    }
}
