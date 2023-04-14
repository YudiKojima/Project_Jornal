using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_React.Configuracao;
using Project_React.Model;

namespace Project_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassificadosController : ControllerBase
    {
        private readonly Contexto _context;

        public ClassificadosController(Contexto context)
        {
            _context = context;
        }

        // GET: api/Classificados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classificado>>> GetClassificado()
        {
            return await _context.Classificado.ToListAsync();
        }

        // GET: api/Classificados/10
        [HttpGet("{id}")]
        public async Task<ActionResult<Classificado>> GetClassificado(int id)
        {
            var classificado = await _context.Classificado.FindAsync(id);

            if (classificado == null)
            {
                return NotFound();
            }

            return classificado;
        }

        // PUT: api/Classificados/10
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassificado(int id,[FromForm]Classificado classificado)
        {
            if (id != classificado.Id)
            {
                return BadRequest();
            }

            _context.Entry(classificado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassificadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Classificados
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Classificado>> PostClassificado([FromForm] Classificado classificado)
        {
            _context.Classificado.Add(classificado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassificado", new { id = classificado.Id }, classificado);
        }

        // DELETE: api/Classificados/10
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassificado(int id)
        {
            var classificado = await _context.Classificado.FindAsync(id);
            if (classificado == null)
            {
                return NotFound();
            }

            _context.Classificado.Remove(classificado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassificadoExists(int id)
        {
            return _context.Classificado.Any(e => e.Id == id);
        }
    }
}
