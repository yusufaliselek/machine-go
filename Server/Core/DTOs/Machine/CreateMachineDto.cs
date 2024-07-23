using System.ComponentModel.DataAnnotations;

namespace Core.DTOs.Machine
{
    public class CreateMachineDto
    {
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public DateTime ManufacturingDate { get; set; }
        [StringLength(50)]
        public string? Status { get; set; }

        public string? Description { get; set; }
        public int Price { get; set; }
    }
}
