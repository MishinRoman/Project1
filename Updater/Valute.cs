using System.Text;
using System.Xml;
using System.Xml.Serialization;

using Updater.Models;
using Updater.Data;
using Microsoft.EntityFrameworkCore;

namespace Updater
{

    public class Valute
    {

        
        public static IEnumerable<Currency> GetValute_SBer()
        {

            var url = "http://www.cbr.ru/scripts/XML_daily.asp";


            XmlSerializer serializer = new XmlSerializer(typeof(ValCurs));
            ValCurs? valCurs;

            XmlReaderSettings settings = new XmlReaderSettings();
            settings.IgnoreComments = true;
            settings.CheckCharacters = true;
            settings.ConformanceLevel = ConformanceLevel.Fragment;
            settings.ValidationType = ValidationType.None;
            settings.DtdProcessing = DtdProcessing.Parse;
            settings.MaxCharactersFromEntities = 1024;

            
            try
            {
                using (var reader = XmlReader.Create(url, settings))
                {

                    Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                    valCurs = serializer.Deserialize(reader) as ValCurs;


                    reader.Close();
                    reader.Dispose();

                }
                if (valCurs == null) { Console.WriteLine("Нет данных о валюте"); }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;

            }
            Console.WriteLine("\t" + valCurs.name +"\n\tUpdate data:"+valCurs.Date);
           

            Console.WriteLine("\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
            foreach (var curs in valCurs.Valute) 
            {

                Console.WriteLine(String.Concat(nameof(curs.Value), ": ", curs.Value, " ", curs.Name, " ", nameof(curs.Rate), ": ", curs.Rate, " ",
                   " за ", curs.Nominal));

            }
            Currency[] result = valCurs?.Valute??throw new Exception("Ошибка загрузки данных");


            return result;
        }


    }
}
