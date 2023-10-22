using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LoginController(
            ApplicationDbContext context, 
            IConfiguration configuration, 
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;

        }

        PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();


        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> RegisterAsync(UserLoginDTO request)
        {
            var userFromDb = await _context?.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);

            if (userFromDb != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "This login exist");

            }
            
           
            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.UserName + "@mail.com",
                PhoneNumber = "333-2222-333-44"
                //...

            };

           var result = await _userManager.CreateAsync(user, request.Password);

           user.PasswordHash = hasher.HashPassword(user, request.Password);

            //if (user == null) { return StatusCode(StatusCodes.Status500InternalServerError, new { message = "User Registration Error" }); }
            if (!result.Succeeded) { return StatusCode(StatusCodes.Status406NotAcceptable, new { message = result.Errors }); }


            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDTO logingUser)
        {

            var user= await _userManager.FindByNameAsync(logingUser.UserName);
                      
            if(user ==null) return  NotFound("User not found");
           
            var result = await _signInManager.PasswordSignInAsync(user,logingUser.Password, false,false);

            if (result.Succeeded)
            {
                    var token = await _userManager.GenerateUserTokenAsync(user,"Bearer","JWT");

                return Ok(token);
            }


            //    var userFormDb = await _context.Users.FirstOrDefaultAsync(u => u.UserName == logingUser.UserName);

            //    if (userFormDb == null) { StatusCode(StatusCodes.Status203NonAuthoritative, "Неверный логин"); }

            //   var result = hasher.VerifyHashedPassword(userFormDb, userFormDb.PasswordHash, logingUser.Password);

            //if(result == PasswordVerificationResult.Success)
            //    {
            //        var token = CreateToken(userFormDb);

            //    return StatusCode(StatusCodes.Status200OK, token);
            //    }
            //    else
            //    {
            //        return Unauthorized(result.ToString());
            //    }
            return Unauthorized();
        }

        

        private string CreateToken(ApplicationUser user)
        {
           var optionsFromSettings = new AuthOptions(_configuration) ;

            
           
            
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


            return jwt;
        }



    }

}
