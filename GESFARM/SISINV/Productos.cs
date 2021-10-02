using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BASE;

namespace SISINV.PRODUCTOS
{
    public static class Productos
    {

        public static List<ItemLista> ListaProductos()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_AUTO_PRODUCTOS", parameters);

            return ListaMetodos.GetList(DT);

        }

    }
}
