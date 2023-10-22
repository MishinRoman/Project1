using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Updater.Data;

using Updater;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public CurrencyController(ApplicationDbContext db)
        {
            _db = db;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrences()
        {
            var currencies = await _db.Currencies.ToListAsync();
            return Ok(currencies);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurrency(string Id)
        {
            var currency = await _db.Currencies.FirstOrDefaultAsync(c => c.ID == Id);
            return Ok(currency);
        }

    }
}
