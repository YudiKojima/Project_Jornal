using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_React.Model
{
    [Table("Classificado")]
    public class Classificado
    {
        [Column("Id")]
        public int Id { get; set; }

        [Column("Titulo")]
        public string Titulo { get; set; }

        [Column("Descricao")]
        public string Descricao { get; set; }

        [Column("Date")]
        public DateTime Date { get; set; }
    }
}
