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
    public class Presentacion
    {

        public int PR_Id { get; set; }
        public string PR_Descrip { get; set; }
        public int PR_Vigente { get; set; }


        public void Administrar(string Accion)
        {
            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,Accion),
                    Data.NewIN("@ID",SqlDbType.Int,PR_Id),
                    Data.NewIN("@DESCRIP",SqlDbType.VarChar,PR_Descrip),
                    Data.NewIN("@VIGENCIA",SqlDbType.Int,PR_Vigente)
                };

            db.CallDBParameters("GF_ADM_PRINC_ACT", parameters);

        }

        public List<Presentacion> Lista()
        {
            List<Presentacion> Lista = new List<Presentacion>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ID",SqlDbType.Int, PR_Id),
                    Data.NewIN("@VIGENCIA",SqlDbType.Int, PR_Vigente)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PRIN_ACT", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Presentacion
                    {
                        PR_Id = int.Parse(item["PA_Id"].ToString()),
                        PR_Descrip = item["PA_Descrip"].ToString(),
                        PR_Vigente = int.Parse(item["PA_Vigencia"].ToString())
                    });
                }
            }


            return Lista;
        }



    }
}
