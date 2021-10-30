using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace BASE
{
    public static class ArchivoJson
    {

        public static string GeneraJson(dynamic objeto) {

            return JsonConvert.SerializeObject(objeto);

        }


        public static dynamic GeneraObjeto(string objeto)
        {

            return JsonConvert.DeserializeObject<dynamic>(objeto);

        }



    }
}
