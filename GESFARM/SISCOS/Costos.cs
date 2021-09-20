using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SISCOS.COSTOS
{
    public class Costos
    {
        public string ID
        {
            get { return ID; }
            private set { value = value.ToUpper(); }
        }

        public Costos(string iD)
        {
            ID = iD;
        }



    }
}
