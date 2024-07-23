using Core.DTOs.Machine;
using Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IMachineService _machineService;
        public MachineController(IMachineService machineService)
        {
            _machineService = machineService;
        }


        [HttpGet]
        public async Task<IActionResult> GetMachines(int pageNumber = 1, int pageSize = 10, string searchTerm = null, int min = 0, int max = 0, string checkedKeys = null)
        {
            var machines = await _machineService.GetMachinesAsync(pageNumber, pageSize, searchTerm, min, max, checkedKeys);
            return Ok(machines);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetMachine(int id)
        {
            try
            {
                var machine = await _machineService.GetMachineAsync(id);
                return Ok(machine);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateMachine([FromBody] CreateMachineDto createMachineDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var machine = await _machineService.CreateMachineAsync(createMachineDto);
            return CreatedAtAction(nameof(GetMachine), new { id = machine.Id }, machine);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMachine(int id, [FromBody] UpdateMachineDto updateMachineDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var machine = await _machineService.UpdateMachineAsync(id, updateMachineDto);
                return Ok(machine);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMachine(int id)
        {
            try
            {
                await _machineService.DeleteMachineAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
