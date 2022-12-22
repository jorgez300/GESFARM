using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BASE;
using ClosedXML.Excel;
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

    public class ReporteCostoProdItem
    {
        public string Codigo { get; set; } = null;
        public string Descripcion { get; set; } = null;
        public string CostoUsd { get; set; } = null;
        public string CostoBs { get; set; } = null;
        public string Precio3 { get; set; } = null;
        public string Existen { get; set; } = null;

    }

    public class CostoProd
    {

        public List<CostoProdItem> Producto { get; set; } = new List<CostoProdItem>();
        public CostoProdItem Item { get; set; } = new CostoProdItem();
        public List<CostoProdItem> Historico { get; set; } = new List<CostoProdItem>();
        private List<ReporteCostoProdItem> ReporteCosto { get; set; } = new List<ReporteCostoProdItem>();

        public string Codigo { get; set; }
        public string Instancia { get; set; }
        public string Tasa { get; set; }
        public string PorcUtil { get; set; }
        public string Origen { get; set; }

        public string Base64 { get; set; }
        public string NombreExcel { get; set; }


        public void Parametros()
        {

            Tasa = Parametro.Retorna("TASA").PAR_Valor_Numerico.ToString();
            PorcUtil = Parametro.Retorna("POR_UTIL").PAR_Valor_Numerico.ToString();
            Origen = Parametro.Retorna("ORI_DATA").PAR_Valor_Texto.ToString();


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

        public void GetDatosReporte()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_REPORTE_COSTOS", parameters);

            if (DT.Rows.Count > 0)
            {
                GeneraExcel(DT);
            }
        }

        private void GeneraExcel(DataTable DT)
        {

            Parametros();

            DT.Columns["Codigo"].ColumnName = "Codigo";
            DT.Columns["Descripcion"].ColumnName = "Descripcion";
            DT.Columns["CostoUsd"].ColumnName = "Costo USD";
            DT.Columns["CostoBs"].ColumnName = "Costo Bs";
            DT.Columns["Precio3"].ColumnName = "Precio 3";
            DT.Columns["Existen"].ColumnName = "Existencia";


            XLWorkbook wb = new XLWorkbook();
            IXLWorksheet Hoja = wb.Worksheets.Add(DT, "Reporte de costos");

            IXLRange range = Hoja.Range("A1:F1");
            range.DataType = XLDataType.Text;
            range.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            range.Style.Fill.BackgroundColor = XLColor.FromArgb(69, 111, 173);

            Hoja.Columns().AdjustToContents();
            Hoja.Row(1).InsertRowsAbove(5);

            range = Hoja.Range("A1:D1");
            range.DataType = XLDataType.Text;
            range.Value = "Reporte de costos " + Origen;
            range.Style.Fill.BackgroundColor = XLColor.FromArgb(69, 111, 173);
            range.Style.Font.FontColor = XLColor.White;
            range.Style.Font.SetBold();
            range.Merge();

            range = Hoja.Range("A2:D2");
            range.DataType = XLDataType.Text;
            range.Value = "Fecha: " + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
            range.Style.Fill.BackgroundColor = XLColor.FromArgb(69, 111, 173);
            range.Style.Font.FontColor = XLColor.White;
            range.Style.Font.SetBold();
            range.Merge();
            NombreExcel = "Reporte de costos " + Origen + " "+ DateTime.Now.ToString("dd MM yyyy HH mm ss") + ".xlsx";

            Directorios.CreaDirectorio(Directorios.DirCostos);
            Directorios.LimpiaDirectorio(Directorios.DirCostos);
            wb.SaveAs(Directorios.DirCostos + NombreExcel);

            wb.Dispose();
            Base64 = Directorios.LeeArchivo(Directorios.DirCostos, NombreExcel, "xlsx");
        }




    }
}
