using Microsoft.EntityFrameworkCore;
using Project_React.Model;

namespace Project_React.Configuracao
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options) 
        { 
        
            Database.EnsureCreated();
        }

        public DbSet<Classificado> Classificado { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Classificado>()
                .Property(p => p.Date)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
