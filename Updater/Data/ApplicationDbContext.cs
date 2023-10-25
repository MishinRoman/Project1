

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Updater.Models;

namespace Updater.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Currency> Currencies { get; set; }

        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {

            

        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Currency>().HasKey(k => k.Id).HasName("id");


            base.OnModelCreating(builder);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(b => b.MigrationsAssembly("Project1"));
            base.OnConfiguring(optionsBuilder);
        }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);
        }
    }
}