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

    public class ProdXPa
    {

        public string CODIGO { get; set; }
        public string DESCRIPCION { get; set; }
        public int EXISTEN { get; set; }
        public int ID_PA { get; set; }
        public float COSTO { get; set; }
        public float PRECIO { get; set; }
        public string PA_DESCRIP { get; set; }

    }
    public class Equivalencia
    {

        public int PXP_PaId { get; set; }
        public string PXP_CodProd { get; set; }

        public void Administrar(string Accion)
        {

            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.VarChar,Accion),
                    Data.NewIN("@PA_ID",SqlDbType.Int,PXP_PaId),
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,PXP_CodProd)
                };

            db.CallDBParameters("GF_ADM_EQUIVALENCIA", parameters);



        }
        public List<ProdXPa> ListaProdxPrincAct()
        {

            List<ProdXPa> Lista = new List<ProdXPa>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,PXP_CodProd),
                    Data.NewIN("@PRIN_ACT",SqlDbType.Int,PXP_PaId)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PROD_X_PA", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new ProdXPa
                    {
                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIPCION = item["DESCRIPCION"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        COSTO = float.Parse(item["COSTPRO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO3"].ToString()),
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString()
                    });
                }
            }

            return Lista;
        }
        public List<PrincipioActivo> ListaPrincActXProd()
        {

            List<PrincipioActivo> Lista = new List<PrincipioActivo>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,PXP_CodProd)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PA_X_PROD", parameters);

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
