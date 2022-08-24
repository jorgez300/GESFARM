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
        public string CP_Id { get; set; } = null;
        public string CP_Codprod { get; set; } = null;
        public string CP_Descrip { get; set; } = null;
        public string CP_CodInst { get; set; } = null;
        public string CP_DscInst { get; set; } = null;
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
        public string Instancia { get; set; }
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
                    Data.NewIN("@ID", SqlDbType.VarChar, Codigo),
                    Data.NewIN("@INST", SqlDbType.Int, Instancia)
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
                        CP_CodInst = item["CodInst"].ToString(),
                        CP_DscInst = item["DscInst"].ToString(),
                        CP_CostoUSD = float.Parse(item["Costo"].ToString())
                    });
                }
            }
        }

        public void GetHistorico()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ID", SqlDbType.VarChar, Codigo)
                };
            DataTable DT = db.CallDBList("GF_LISTA_COSTOPROD_HIST", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Historico.Add(new CostoProdItem
                    {
                        CP_Id = item["ID"].ToString(),
                        CP_Codprod = item["Codprod"].ToString(),
                        CP_Descrip = item["Descrip"].ToString(),
                        CP_CostoUSD = float.Parse(item["Costo"].ToString()),
                        CP_ProveedorDsc = item["Proveedor"].ToString(),
                        CP_Tasa = float.Parse(item["Tasa"].ToString()),
                        CP_FechaAct = item["Fecha"].ToString()
                    });
                }
            }
        }



        public void Administrar(string Accion)
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION", SqlDbType.VarChar, Accion),
                    Data.NewIN("@CODPROD", SqlDbType.VarChar, Item.CP_Codprod),
                    Data.NewIN("@CODPROV", SqlDbType.VarChar, Item.CP_Proveedor),
                    Data.NewIN("@COSTOUSD", SqlDbType.Decimal, Item.CP_CostoUSD)
                };
            db.CallDBParameters("GF_ADM_COSTOPROD", parameters);

        }

        public void Calculo()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            db.CallDBParameters("GF_GENERA_CALCULO_COSTOS", parameters);

        }

        public void EliminaHist(string Accion)
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION", SqlDbType.VarChar, Accion),
                    Data.NewIN("@ID", SqlDbType.VarChar, Item.CP_Id)
                };
            db.CallDBParameters("GF_ADM_COSTOPRODHIST", parameters);

        }

    }
}
