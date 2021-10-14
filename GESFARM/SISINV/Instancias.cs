using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SISINV
{
    public class Instancias
    {
        public static List<ItemLista> ListaInstancias()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_AUTO_INSTANCIAS", parameters);

            return ListaMetodos.GetList(DT);

        }




    }



}
