using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SISEQUIV
{


    public class Equivalencia
    {

        public int PA_ID { get; set; }
        public string CODPROD { get; set; }

        public void Administrar(string Accion)
        {

            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.VarChar,Accion),
                    Data.NewIN("@PA_ID",SqlDbType.Int,PA_ID),
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,CODPROD)
                };

            db.CallDBParameters("GF_ADM_EQUIVALENCIA", parameters);



        }



    }
}
