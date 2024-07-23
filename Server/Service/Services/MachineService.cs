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

 public async Task<PagedResult<Machine>> GetMachinesAsync(int pageNumber, int pageSize, string searchTerm, int min, int max, string checkedKeys)
{
    int[] checkedKeysArray = Array.Empty<int>();
    if (!string.IsNullOrWhiteSpace(checkedKeys))
    {
        checkedKeysArray = checkedKeys.Split(',').Select(int.Parse).ToArray();
    }

    IQueryable<Machine> result = _machines;

    // Arama terimine göre filtreleme
    if (!string.IsNullOrWhiteSpace(searchTerm))
    {
        result = result.Where(m => m.Status.Contains(searchTerm) || m.Description.Contains(searchTerm));
    }

    // Fiyat aralığına göre filtreleme
    if (min > 0)
    {
        result = result.Where(m => m.Price >= min);
    }
    if (max > 0) {
        result = result.Where(m => m.Price <= max);
    }

    // Kategori ve altkategori ID'lerine göre filtreleme
    if (checkedKeysArray.Length > 0)
    {
        // Kategori ID ve altkategori ID'lerini ayır
        var categoryIds = checkedKeysArray.Where(id => id > 0 && id < 1000).ToArray();
        var subcategoryIds = checkedKeysArray.Where(id => id >= 1000).ToArray();

        // Kategori ID'lerine göre filtreleme
        if (categoryIds.Length > 0)
        {
            result = result.Where(m => categoryIds.Contains(m.CategoryId));
        }

        // Altkategori ID'lerine göre filtreleme
        if (subcategoryIds.Length > 0)
        {
            result = result.Where(m => subcategoryIds.Contains(m.SubcategoryId));
        }
    }

    var totalCount = await result.CountAsync();
    var machines = await result.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

    return new PagedResult<Machine>
    {
        Items = machines,
        TotalCount = totalCount
    };
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
