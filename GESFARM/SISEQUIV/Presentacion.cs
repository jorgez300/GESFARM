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


        public int? PR_Id { get; set; }
        public string PR_Descrip { get; set; }
        public int? PR_Vigencia { get; set; }

        public void Administrar(string Accion)
        {
            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,Accion),
                    Data.NewIN("@ID",SqlDbType.Int,PR_Id),
                    Data.NewIN("@DESCRIP",SqlDbType.VarChar,PR_Descrip),
                    Data.NewIN("@VIGENCIA",SqlDbType.Int,PR_Vigencia)
                };

            db.CallDBParameters("GF_ADM_PRESENTACION", parameters);

        }
        public List<Presentacion> Lista()
        {
            List<Presentacion> Lista = new List<Presentacion>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ID",SqlDbType.Int, PR_Id),
                    Data.NewIN("@VIGENCIA",SqlDbType.Int, PR_Vigencia)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PRESENTACION", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Presentacion
                    {
                        PR_Id = int.Parse(item["PR_Id"].ToString()),
                        PR_Descrip = item["PR_Descrip"].ToString(),
                        PR_Vigencia = int.Parse(item["PR_Vigencia"].ToString())
                    });
                }
            }


            return Lista;
        }
        public static List<ItemLista> Auto()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_AUTO_PRESENTACION", parameters);

            return ListaMetodos.GetList(DT);

        }



    }
}
