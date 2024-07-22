﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
