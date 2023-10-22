using System.ComponentModel.DataAnnotations;
using System.Xml.Schema;
using System.Xml.Serialization;
using System.Xml.XPath;

namespace Updater.Models
{
    public class Currency
    {
       
        [XmlAttribute("ID")]
        public string ID;
        public string Name { get; set; }
        [XmlElement( ElementName="VunitRate")]
        public string Rate { get; set; }
        public string NumCode { get; set; }
        public string Nominal { get; set; }
        public string CharCode { get; set; }
        public string Value {get; set;
        }
    }
}
