using Core.DTOs.Machine;
using Core.Entities;

namespace Core.Services
{
    public interface IMachineService
    {
        Task<Machine> CreateMachineAsync(CreateMachineDto createMachineDto);
        Task<Machine> GetMachineAsync(int id);
        Task<PagedResult<Machine>> GetMachinesAsync(int pageNumber, int pageSize, string searchTerm, int min, int max, string checkedKeys);
        Task<Machine> UpdateMachineAsync(int id, UpdateMachineDto updateMachineDto);
        Task DeleteMachineAsync(int id);
    }
}
