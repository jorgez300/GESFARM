using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SISEQUIV
{
    public class FiltrosTotales {

        public int? PRIN_ACT { get; set; }
        public string EXISTEN { get; set; }
    }
    public class ItemTotales
    {
        public int ID_PA { get; set; }
        public int ID_PR { get; set; }
        public string PA_DESCRIP { get; set; }
        public string PR_DESCRIP { get; set; }
        public int TOTAL_EEPP { get; set; }
        public int TOTAL { get; set; }


        public static List<ItemTotales> ListaTotales(FiltrosTotales F)
        {

            List<ItemTotales> Lista = new List<ItemTotales>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@PRIN_ACT",SqlDbType.Int,F.PRIN_ACT),
                    Data.NewIN("@EXISTEN",SqlDbType.VarChar,F.EXISTEN)
                };
            DataTable DT = db.CallDBList("GF_LISTA_TOTALES_PROD_X_PA", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new ItemTotales
                    {
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        ID_PR = int.Parse(item["ID_PR"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString(),
                        PR_DESCRIP = item["PR_DESCRIP"].ToString(),
                        TOTAL_EEPP = int.Parse(item["TOTAL_EEPP"].ToString()),
                        TOTAL = int.Parse(item["TOTAL"].ToString())
                    });
                }
            }

            return Lista;
        }



    }
}
