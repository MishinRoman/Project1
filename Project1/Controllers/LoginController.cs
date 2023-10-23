using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Org.BouncyCastle.Asn1.UA;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Updater.Data;
using Updater.Models;
using Updater.Models.DTO;

namespace Project1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(
            ApplicationDbContext context,
            IConfiguration configuration
            )
        {
            _configuration = configuration;
            _context = context;
        }

        PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();

        

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserLoginDTO request)
        {
            if(request.UserName.IsNullOrEmpty()||request.Password.IsNullOrEmpty()) 
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, new {message= "Пользователь уже есть"});            
                    }
            var userFromDb = await _context?.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);

            if (userFromDb != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "This login exist");

            }


            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.UserName + "@mail.com",
                PhoneNumber = "333-2222-333-44",
                EmailConfirmed=true,
                PhoneNumberConfirmed=true,
               
                //...

            };

            var identityUserLogin = new IdentityUserLogin<string>
            {
                UserId = user.Id,
                LoginProvider = user.UserName,
                ProviderDisplayName = user.UserName,
                ProviderKey = user.Id

            };
            
            user.PasswordHash = hasher.HashPassword(user, request.Password);
           if (user == null) 
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "User Registration Error" }); 

            }
           
            await _context.Users.AddAsync(user);


            await _context.UserLogins.AddAsync(identityUserLogin);

            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDTO logingUser)
        {
            var userFormDb = await _context.Users.FirstOrDefaultAsync(u => u.UserName == logingUser.UserName);

            if (userFormDb == null) { StatusCode(StatusCodes.Status203NonAuthoritative, "Неверный логин"); }

            var result = hasher.VerifyHashedPassword(userFormDb, userFormDb.PasswordHash, logingUser.Password);

            if (result == PasswordVerificationResult.Success)
            {
                var token = await CreateTokenAsync(userFormDb);

                return StatusCode(StatusCodes.Status200OK, token);
            }
            else
            {
                userFormDb.AccessFailedCount++;
                _context.Users.Update(userFormDb);
                await _context.SaveChangesAsync();
                return Unauthorized(result.ToString());
            }
        }



        private async Task<string> CreateTokenAsync(ApplicationUser user)
        {
            var optionsFromSettings = new AuthOptions(_configuration);


            

            List<Claim> claims = new List<Claim>
            {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
            };


            
            var signinCredentials = new SigningCredentials
              (optionsFromSettings.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                   issuer: optionsFromSettings.ISSUER,
                    audience: optionsFromSettings.AUDIENCE,
                   claims: claims,
                   expires: DateTime.Now.AddDays(10),
                   signingCredentials: signinCredentials
               );

            var jwt = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            var token = new IdentityUserToken<string>
            {
                UserId=user.Id,
                LoginProvider = user.UserName,
                Value=jwt.Normalize(),
                Name=jwt,
            };
           
            //await _context.UserTokens.AddAsync(token);
            await _context.SaveChangesAsync();
           
            return jwt;
        }



    }

}
