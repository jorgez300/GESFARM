using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BASE
{
    public class Error
    {


        public string Mensaje { get; set; }
        public string Ex { get; set; }


        public Error(string mensaje, string ex)
        {
            Mensaje = mensaje;
            Ex = ex;
        }



    }
}
