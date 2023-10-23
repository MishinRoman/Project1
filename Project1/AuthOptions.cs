using Microsoft.IdentityModel.Tokens;

using System.Text;

public record AuthOptions(IConfiguration _configuration)
{

    public readonly string ISSUER = "http://localhost:5098"; // издатель токена
    public readonly string AUDIENCE = "https://localhost:44424"; // потребитель токена
    private string KEY = "JxpJ3n5kFz8q/aPJn7DyrEEmi1+cAzhoGJf4MZxtCkc=";   // ключ для шифрации

    //public readonly string ISSUER = _configuration["Authentication:Schemes:Bearer:ValidIssuer:0:Value"]?? "http://localhost:5098"; // издатель токена
    //public readonly string AUDIENCE = _configuration["Authentication:Schemes:Bearer:ValidAudiences:0:Value"]?? "http://localhost:5098"; // потребитель токена
    //private string KEY = _configuration["Authentication:Schemes:Bearer:SigningKeys:0:Value"];   // ключ для шифрации
    /// <summary>
    /// Создает ключ из данных в settings.json
    /// </summary>
    /// <returns>SymmetricSecurityKey</returns>
    public SymmetricSecurityKey GetSymmetricSecurityKey() =>

        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}
