using BASE;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SISOPER.DIARIO
{
    public class ItemDiariolActual
    {

        public string Anio = string.Empty;
        public string Mes = string.Empty;
        public string Dia = string.Empty;
        public float Facturas = 0;
        public float Cantidad = 0;
        public float MtoXVenta = 0;
        public float Venta = 0;
        public float Costo = 0;
        public float Utilidad = 0;
        public float PorCentajeUtilidad = 0;

        public float ItemsFalla = 0;
        public float CostoFalla = 0;


    }
    public class ItemDiario
    {


        public List<string> Periodo = new List<string>();
        public List<float> Facturas = new List<float>();
        public List<float> Venta = new List<float>();
        public List<float> MtoXVenta = new List<float>();
        public List<float> Costo = new List<float>();
        public List<float> Utilidad = new List<float>();
        public List<float> PorCentajeUtilidad = new List<float>();
        public List<float> Cantidad = new List<float>();

        public List<float> ItemsFalla = new List<float>();
        public List<float> CostoFalla = new List<float>();
    }

    public class ItemFallas
    {

        public List<string> Periodo = new List<string>();

        public List<float> ItemsFalla = new List<float>();
        public List<float> CostoFalla = new List<float>();
    }

    public class ResumenDiario
    {
        public ItemDiario Diario = new ItemDiario();
        public ItemDiariolActual DiaActual = new ItemDiariolActual();
        public ItemFallas Fallas = new ItemFallas();

        public ResumenDiario()
        {
            _Diario();
            _DiaActual();
            //_Fallas();
        }

        void _Diario()
        {

            ItemDiario Lista = new ItemDiario();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_RESUMEN_DIARIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Periodo.Add(item["Anio"].ToString() + "-" + item["Mes"].ToString() + "-" + item["Dia"].ToString());
                    Lista.Facturas.Add(float.Parse(item["Facturas"].ToString()));
                    Lista.Venta.Add(float.Parse(item["Venta"].ToString()));
                    Lista.Costo.Add(float.Parse(item["Costo"].ToString()));
                    Lista.Utilidad.Add(float.Parse(item["Utilidad"].ToString()));
                    Lista.PorCentajeUtilidad.Add(float.Parse(item["PorCentajeUtilidad"].ToString()));
                    Lista.Cantidad.Add(float.Parse(item["Cantidad"].ToString()));
                    Lista.MtoXVenta.Add(float.Parse(item["MtoXVenta"].ToString()));
                    Lista.ItemsFalla.Add(float.Parse(item["Cant_Fallas"].ToString()));
                    Lista.CostoFalla.Add(float.Parse(item["Monto_Fallas"].ToString()));
                }
            }

            Diario = Lista;
        }

        void _DiaActual()
        {
            ItemDiariolActual Item = new ItemDiariolActual();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_RESUMEN_DIARIO_ACTUAL", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Item = new ItemDiariolActual
                    {
                        Anio = item["Anio"].ToString(),
                        Mes = item["Mes"].ToString(),
                        Dia = item["Dia"].ToString(),
                        Facturas = float.Parse(item["Facturas"].ToString()),
                        Venta = float.Parse(item["Venta"].ToString()),
                        Costo = float.Parse(item["Costo"].ToString()),
                        Utilidad = float.Parse(item["Utilidad"].ToString()),
                        PorCentajeUtilidad = float.Parse(item["PorCentajeUtilidad"].ToString()),
                        Cantidad = float.Parse(item["Cantidad"].ToString()),
                        MtoXVenta = float.Parse(item["MtoXVenta"].ToString())
                    };
                }
            }

            DiaActual = Item;

        }

        void _Fallas()
        {

            ItemFallas Lista = new ItemFallas();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_RESUMEN_FALLAS_DIARIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Periodo.Add(item["Anio"].ToString() + "-" + item["Mes"].ToString() + "-" + item["Dia"].ToString());
                    Lista.ItemsFalla.Add(float.Parse(item["CANTIDAD"].ToString()));
                    Lista.CostoFalla.Add(float.Parse(item["TOTAL"].ToString()));

                }
            }


            Fallas = Lista;


        }

    }


}
