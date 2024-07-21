using Core.DTOs.Machine;
using Core.Entities;

namespace Core.Services
{
    public interface IMachineService
    {
        Task<Machine> CreateMachineAsync(CreateMachineDto createMachineDto);
        Task<Machine> GetMachineAsync(int id);
        Task<IEnumerable<Machine>> GetMachinesAsync();
        Task<Machine> UpdateMachineAsync(int id, UpdateMachineDto updateMachineDto);
        Task DeleteMachineAsync(int id);
    }
}
