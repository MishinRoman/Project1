using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Updater.Data;
using Updater.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));

builder.Services.AddIdentityCore<ApplicationUser>(options =>
    options.SignIn.RequireConfirmedAccount = false
    )
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 3;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(50000);
    options.Lockout.MaxFailedAccessAttempts = 50;
    options.Lockout.AllowedForNewUsers = true;

    // User settings.
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;
});



var optionsFromSettings = new AuthOptions(builder.Configuration);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;


}).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {

                    ValidateIssuer = true,
                    ValidIssuer = optionsFromSettings.ISSUER,
                    ValidateAudience = true,
                    ValidAudience = optionsFromSettings.AUDIENCE,
                    IssuerSigningKey = optionsFromSettings.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true,

                };

            });

builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddCors();




var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();



}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}




//app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();


app.UseCors(builder =>
    {
        builder.WithOrigins("https://localhost:44424").AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithExposedHeaders("Authorization");

    });
app.MapControllers();
app.UseStaticFiles();

app.Run();
