using Duende.IdentityServer.EntityFramework.Options;


using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Updater.Models;

namespace Updater.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Currency>Currencies { get; set; }
       
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
                     
            

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            builder.Entity<Currency>().HasKey(k => k.ID);
            builder.Entity<Currency>().Property(p => p.Rate).IsRequired(false);
            
            
            base.OnModelCreating(builder);
            
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);
        }
    }
}