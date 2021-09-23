using BASE;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SISOPER.MENSUAL
{

    public class ItemMensualActual
    {

        public string Anio = string.Empty;
        public string Mes = string.Empty;
        public float Facturas = 0;
        public float Cantidad = 0;
        public float MtoXVenta = 0;
        public float Venta = 0;
        public float Costo = 0;
        public float Utilidad = 0;
        public float PorCentajeUtilidad = 0;


    }

    public class ItemMensual 
    {


        public List<string> Periodo = new List<string>();
        public List<float> Facturas = new List<float>();
        public List<float> Venta = new List<float>();
        public List<float> MtoXVenta = new List<float>();
        public List<float> Costo = new List<float>();
        public List<float> Utilidad = new List<float>();
        public List<float> PorCentajeUtilidad = new List<float>();
        public List<float> Cantidad = new List<float>();

    }

    public class ResumenMensual
    {
        public ItemMensual Meses = new ItemMensual();
        public ItemMensualActual MesActual = new ItemMensualActual();


        public ResumenMensual()
        {
            Meses = _Meses();
            MesActual = _MesActual();
        }

        ItemMensual _Meses() {


            ItemMensual Lista = new ItemMensual();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_RESUMEN_MENSUAL", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Periodo.Add(item["Anio"].ToString() + "-" + item["Mes"].ToString());
                    Lista.Facturas.Add(float.Parse(item["Facturas"].ToString()));
                    Lista.Venta.Add(float.Parse(item["Venta"].ToString()));
                    Lista.Costo.Add(float.Parse(item["Costo"].ToString()));
                    Lista.Utilidad.Add(float.Parse(item["Utilidad"].ToString()));
                    Lista.PorCentajeUtilidad.Add(float.Parse(item["PorCentajeUtilidad"].ToString()));
                    Lista.Cantidad.Add(float.Parse(item["Cantidad"].ToString()));
                    Lista.MtoXVenta.Add(float.Parse(item["MtoXVenta"].ToString()));
                }
            }

            return Lista;



        }

        ItemMensualActual _MesActual()
        {


            ItemMensualActual Item = new ItemMensualActual();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_RESUMEN_MENSUAL_ACTUAL", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Item = new ItemMensualActual
                    {
                        Anio = item["Anio"].ToString(),
                        Mes = item["Mes"].ToString(),
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


            return Item;



        }

    }


}
