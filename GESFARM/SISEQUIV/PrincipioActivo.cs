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
    public class FiltrosPrinActivo
    {
        public int? Vigencia { get; set; } = null;
    }

    public class PrincipioActivo
    {
        public int PA_Id { get; set; }
        public string PA_Descrip { get; set; }
        public int PA_Vigencia { get; set; }

        public void Administrar(string Accion)
        {
            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,Accion),
                    Data.NewIN("@ID",SqlDbType.Int,PA_Id),
                    Data.NewIN("@DESCRIP",SqlDbType.VarChar,PA_Descrip),
                    Data.NewIN("@VIGENCIA",SqlDbType.Int,PA_Vigencia)
                };

            db.CallDBParameters("GF_ADM_PRINC_ACT", parameters);

        }

        public List<PrincipioActivo> Lista(FiltrosPrinActivo F)
        {
            List<PrincipioActivo> Lista = new List<PrincipioActivo>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@VIGENCIA",SqlDbType.Int,F.Vigencia)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PRIN_ACT", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new PrincipioActivo
                    {
                        PA_Id = int.Parse(item["PA_Id"].ToString()),
                        PA_Descrip = item["PA_Descrip"].ToString(),
                        PA_Vigencia = int.Parse(item["PA_Vigencia"].ToString())
                    });
                }
            }


            return Lista;
        }


    }
}
