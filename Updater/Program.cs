﻿// See https://aka.ms/new-console-template for more information

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Updater;
using Updater.Data;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("+++++++++++Start Update++++++++++++++");

        var builder = WebApplication.CreateBuilder(args);

        string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySQL(connectionString);

        });
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();
        

        var app = builder.Build();
        var db = app.Services.GetService<ApplicationDbContext>();
        var data = Valute.GetValute_SBer();

        if (db.Currencies.Count() == 0)
        {
            db.Currencies.AddRange(data);
        }
        else
        {
            db.Currencies.UpdateRange(data);
            
        }


      
        db.SaveChanges();
       
        Console.WriteLine("++++++++++End Update+++++++++++++++");
        Console.WriteLine($"Обновление прошло  {DateTime.Now}");


    }
}