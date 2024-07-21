using AutoMapper;
using Core.DTOs.Machine;
using Core.Entities;
using Core.Services;
using Microsoft.EntityFrameworkCore;
using Repository;

namespace Service.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;
        private readonly DbSet<Machine> _machines;

        public MachineService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _machines = dbContext.Set<Machine>();
        }

        private async Task<Machine> ThrowIfMachineNotFoundAsync(int id)
        {
            var machine = await _machines.FindAsync(id);
            if (machine == null)
            {
                throw new Exception("Machine not found");
            }
            return machine;
        }

        public async Task<Machine> CreateMachineAsync(CreateMachineDto createMachineDto)
        {
            var machine = _mapper.Map<Machine>(createMachineDto);
            await _machines.AddAsync(machine);
            await _dbContext.SaveChangesAsync();
            return machine;
        }

        public async Task DeleteMachineAsync(int id)
        {
            var machine = await ThrowIfMachineNotFoundAsync(id);
            _machines.Remove(machine);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Machine> GetMachineAsync(int id)
        {
            return await ThrowIfMachineNotFoundAsync(id);
        }

        public async Task<IEnumerable<Machine>> GetMachinesAsync()
        {
            return await _machines.ToListAsync();
        }

        public async Task<Machine> UpdateMachineAsync(int id, UpdateMachineDto updateMachineDto)
        {
            if (id != updateMachineDto.Id)
            {
                throw new Exception("Id mismatch");
            }

            var existingMachine = await ThrowIfMachineNotFoundAsync(id);
            var machine = _mapper.Map(updateMachineDto, existingMachine);

            _machines.Update(machine);
            await _dbContext.SaveChangesAsync();
            return machine;
        }
    }
}
