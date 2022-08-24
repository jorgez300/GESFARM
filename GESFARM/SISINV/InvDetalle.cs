using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace SISINV.DETALLE
{

    public class InvDetalleItem
    {
        public string CodProd { get; set; }
        public string Descrip { get; set; }
        public float SeVenden { get; set; }
        public float Existen { get; set; }
        public float Minimo { get; set; }
        public float Maximo { get; set; }
        public float Sobran { get; set; }
        public float Costo { get; set; }
        public float Precio { get; set; }
        public string Instancia { get; set; }
        public string PrincAct { get; set; }
        public string Pres { get; set; }
        public float CostoSobrante { get; set; }

    }

    public class InvVentasItem
    {
        public List<string> Periodo = new List<string>();
        public List<float> Vendido = new List<float>();


    }

    public class InvDetalleFiltros
    {
        public string F_Anio = string.Empty;
        public string F_Mes = string.Empty;
        public string F_CodProd = string.Empty;

    }


    public class InvDetalle
    {
        InvDetalleFiltros Filtros = new InvDetalleFiltros();
        public InvVentasItem Ventas = new InvVentasItem();

        public List<InvDetalleItem> Item = new List<InvDetalleItem>();

        public InvDetalle(InvDetalleFiltros filtros)
        {
            Filtros = filtros;

            Item = _Detalle(Filtros);
            Ventas = _Ventas(Filtros);
        }


        List<InvDetalleItem> _Detalle(InvDetalleFiltros Filtros)
        {
            List<InvDetalleItem> Lista = new List<InvDetalleItem>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@F_Anio", SqlDbType.NVarChar, Filtros.F_Anio),
                    Data.NewIN("@F_Mes", SqlDbType.NVarChar, Filtros.F_Mes),
                    Data.NewIN("@F_CodProd", SqlDbType.NVarChar, Filtros.F_CodProd)
                };
            DataTable DT = db.CallDBList("GF_DETALLE_INVENTARIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new InvDetalleItem
                    {
                        CodProd = item["CodProd"].ToString(),
                        Descrip = item["Descrip"].ToString(),
                        SeVenden = float.Parse(item["SeVenden"].ToString()),
                        Existen = float.Parse(item["Existen"].ToString()),
                        Minimo = float.Parse(item["Minimo"].ToString()),
                        Maximo = float.Parse(item["Maximo"].ToString()),
                        Sobran = float.Parse(item["Sobran"].ToString()),
                        Costo = float.Parse(item["CostPro"].ToString()),
                        Precio = float.Parse(item["Precio3"].ToString()),
                        Instancia = item["Instancia"].ToString(),
                        PrincAct = item["PA_DESCRIP"].ToString(),
                        Pres = item["PR_DESCRIP"].ToString(),
                        CostoSobrante = float.Parse(item["CostoSobrante"].ToString())
                    });
                }
            }

            return Lista;
        }


        InvVentasItem _Ventas(InvDetalleFiltros Filtros)
        {


            InvVentasItem Ventas = new InvVentasItem();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@F_CodProd", SqlDbType.NVarChar, Filtros.F_CodProd)
                };
            DataTable DT = db.CallDBList("GF_PROMEDIO_INVENTARIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Ventas.Periodo.Add(item["Anio"].ToString() + "-" + item["Mes"].ToString());
                    Ventas.Vendido.Add(float.Parse(item["Vendidos"].ToString()));
                }
            }


            return Ventas;
        }

    }




    public class InvMinMaxItem
    {
        public string CodProd = string.Empty;
        public string Descrip = string.Empty;
        public float SeVenden = 0;
        public float Existen = 0;
        public float Minimo = 0;
        public float Maximo = 0;
        public float Sobran = 0;
        public float CostoSobrante = 0;
        public float Costo = 0;
        public float Precio = 0;

    }


    public class InvMinMaxFiltros
    {
        public string F_Accion = string.Empty;
        public string F_CodProd = string.Empty;
        public string F_Anio = string.Empty;
        public string F_Mes = string.Empty;
    }

    public class InvMinMax
    {

        public List<InvMinMaxItem> Lista = new List<InvMinMaxItem>();
        InvMinMaxFiltros Filtros = new InvMinMaxFiltros();

        public int IndExistenciaCero { get; set; } = 0;
        public int IndExistencia { get; set; } = 0;
        public int IndSobrante { get; set; } = 0;
        public int IndFaltante { get; set; } = 0;
        public int IndOK { get; set; } = 0;
        public int IndTotal { get; set; } = 0;

        public InvMinMax(InvMinMaxFiltros filtros)
        {
            Filtros = filtros;
            Lista = MinMax();
            SetIndicadores();
        }


        List<InvMinMaxItem> MinMax()
        {

            List<InvMinMaxItem> Lista = new List<InvMinMaxItem>();


            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@F_Anio", SqlDbType.NVarChar, Filtros.F_Anio),
                    Data.NewIN("@F_Mes", SqlDbType.NVarChar, Filtros.F_Mes),
                    Data.NewIN("@F_CodProd", SqlDbType.NVarChar, Filtros.F_CodProd)
                };
            DataTable DT = db.CallDBList("GF_MINMAX_INVENTARIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    InvMinMaxItem x = new InvMinMaxItem
                    {
                        CodProd = item["CodProd"].ToString(),
                        Descrip = item["Descrip"].ToString(),
                        SeVenden = float.Parse(item["SeVenden"].ToString()),
                        Existen = float.Parse(item["Existen"].ToString()),
                        Minimo = float.Parse(item["Minimo"].ToString()),
                        Maximo = float.Parse(item["Maximo"].ToString()),
                        Sobran = float.Parse(item["Sobran"].ToString())
                        //CostoSobrante = float.Parse(item["CostoSobrante"].ToString()),
                        //Costo = float.Parse(item["Costo"].ToString()),
                        //Precio = float.Parse(item["Precio"].ToString())

                    };

                    if (Filtros.F_Accion == "S" && x.Existen > x.Maximo)
                    {
                        Lista.Add(x);
                    }

                    if (Filtros.F_Accion == "F" && x.Existen < x.Minimo)
                    {
                        Lista.Add(x);
                    }

                    if (Filtros.F_Accion == "C" && x.Existen == 0)
                    {
                        Lista.Add(x);
                    }

                    if (Filtros.F_Accion == "T")
                    {
                        Lista.Add(x);
                    }
                }
            }

            if (Lista.Count > 0)
            {

                Lista = Lista.OrderBy(x => x.Sobran).ToList();

                if (Filtros.F_Accion == "S")
                {
                    Lista = Lista.OrderByDescending(x => x.Sobran).ToList();
                }

                if (Filtros.F_Accion == "F")
                {
                    Lista = Lista.OrderBy(x => x.Sobran).ToList();
                }

                if (Filtros.F_Accion == "T")
                {
                    Lista = Lista.OrderByDescending(x => x.Sobran).ToList();
                }

                if (Filtros.F_Accion == "C")
                {
                    Lista = Lista.OrderBy(x => x.Sobran).ToList();
                }

            }

            return Lista;

        }

        void SetIndicadores()
        {

            if (Lista.Count != 0)
            {
                IndTotal = Lista.Count;
                foreach (InvMinMaxItem item in Lista)
                {
                    if (item.Existen == 0)
                    {
                        IndExistenciaCero++;
                    }
                    if (item.Existen != 0 && item.Existen < item.Minimo)
                    {
                        IndFaltante++;
                    }
                    if (item.Existen != 0 && item.Existen >= item.Minimo && item.Existen <= item.Maximo)
                    {
                        IndOK++;
                    }
                    if (item.Existen != 0 && item.Existen >= item.Maximo)
                    {
                        IndSobrante++;
                    }

                    if (item.Existen > 0)
                    {
                        IndExistencia++;
                    }
                }
            }

        }

    }


    public class Falla
    {
        public string CodProd { get; set; }
        public string Descrip { get; set; }
        public int Cantidad { get; set; }
        public decimal Costo { get; set; }
        public int Existen { get; set; }
        public int Promedio { get; set; }
        public int Minimo { get; set; }
        public int Maximo { get; set; }


        public string Fecha { get; set; }

        public void Registrar()
        {
            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.NVarChar,CodProd),
                    Data.NewIN("@CANTIDAD",SqlDbType.Int,Cantidad)
                };

            db.CallDBParameters("GF_ADM_FALLAS", parameters);

        }


        public List<Falla> ListaFallas()
        {

            List<Falla> Lista = new List<Falla>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@FECHA", SqlDbType.NVarChar, Fecha)
                };
            DataTable DT = db.CallDBList("GF_LISTA_FALLAS", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Falla x = new Falla
                    {
                        CodProd = item["CodProd"].ToString(),
                        Descrip = item["Descrip"].ToString(),
                        Cantidad = int.Parse(item["Falla"].ToString()),
                        Costo = decimal.Parse(item["Costo"].ToString()),
                        Existen = int.Parse(item["Existen"].ToString()),
                        Promedio = int.Parse(item["Promedio"].ToString()),
                        Minimo = int.Parse(item["Minimo"].ToString()),
                        Maximo = int.Parse(item["Maximo"].ToString())


                    };

                    Lista.Add(x);
                }
            }

            return Lista;

        }




    }

}
