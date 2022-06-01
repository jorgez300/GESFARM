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

    public class CostoProdItem
    {
        public string CP_Codprod { get; set; } = null;
        public string CP_Descrip { get; set; } = null;
        public string CP_FechaAct { get; set; } = null;
        public float? CP_CostoUSD { get; set; } = null;
        public float? CP_CostoBS { get; set; } = null;
        public float? CP_Tasa { get; set; } = null;
        public string CP_Proveedor { get; set; } = null;
        public string CP_ProveedorDsc { get; set; } = null;
    }

    public class CostoProd
    {

        public List<CostoProdItem> Producto { get; set; } = new List<CostoProdItem>();
        public CostoProdItem Item { get; set; } = new CostoProdItem();
        public List<CostoProdItem> Historico { get; set; } = new List<CostoProdItem>();

        public string Codigo { get; set; }
        public string Tasa { get; set; }
        public string PorcUtil { get; set; }


        public void Parametros()
        {

            Tasa = Parametro.Retorna("TASA").PAR_Valor_Numerico.ToString();
            PorcUtil = Parametro.Retorna("POR_UTIL").PAR_Valor_Numerico.ToString();

        }

        public void GetProducto()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ID", SqlDbType.VarChar, Codigo)
                };
            DataTable DT = db.CallDBList("GF_LISTA_COSTOPROD", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Producto.Add(new CostoProdItem
                    {
                        CP_Codprod = item["Codprod"].ToString(),
                        CP_Descrip = item["Descrip"].ToString(),
                        CP_CostoUSD = float.Parse(item["Costo"].ToString())
                    });
                }
            }
        }

        public void GetHistorico()
        {

        }

        public void Administrar(string Accion)
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION", SqlDbType.VarChar, Accion),
                    Data.NewIN("@CODPROD", SqlDbType.VarChar, Item.CP_Codprod),
                    Data.NewIN("@COSTOUSD", SqlDbType.Decimal, Item.CP_CostoUSD)
                };
            db.CallDBParameters("GF_ADM_COSTOPROD", parameters);

        }


    }
}
