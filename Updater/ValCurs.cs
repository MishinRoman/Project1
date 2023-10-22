using System.Xml.Serialization;
using Updater.Models;

namespace Updater
{
   
    public class ValCurs
    {
        [XmlAttribute("Date")]
        public string Date;
        [XmlAttribute("name")]
        public string name;
        [XmlElement]
        public Currency[] Valute { get; set; }
               
    }
}
