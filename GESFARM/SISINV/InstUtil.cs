using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BASE;
using PARAMETROS;

namespace SISINV
{
    public class InstUtil
    {
        public string CodInst { get; set; } = null;
        public string Descrip { get; set; } = null;
        public int? Utilidad { get; set; } = null;
    }

    public class InstUtilAdm
    {
        public List<InstUtil> PorcInstancias { get; set; } = new List<InstUtil>();
        public InstUtil Item { get; set; } = new InstUtil();


        public void GetInstancias()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_LISTA_INSTUTIL", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    PorcInstancias.Add(new InstUtil
                    {
                        CodInst = item["CodInst"].ToString(),
                        Descrip = item["Descrip"].ToString(),
                        Utilidad = int.Parse(item["Utilidad"].ToString())
                    });
                }
            }
        }

        public void Administrar(string Accion)
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION", SqlDbType.VarChar, Accion),
                    Data.NewIN("@CODINST", SqlDbType.Int, Item.CodInst),
                    Data.NewIN("@POR_UTIL", SqlDbType.Int, Item.Utilidad)
                };
            db.CallDBParameters("GF_ADM_INSTUTIL", parameters);

        }

    }





}
