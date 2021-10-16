using BASE;
using SISINV.DETALLE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SISINV.INSTANCIA
{

    public class InvInstanciasFiltros
    {
        public string F_Anio = string.Empty;
        public string F_Mes = string.Empty;
        public int F_CodInst = 0;

    }

    public class Instancias
    {


        InvInstanciasFiltros Filtros = new InvInstanciasFiltros();

        public List<InvDetalleItem> Productos = new List<InvDetalleItem>();
        public float TotalItems = 0;
        public float TotalExisten = 0;

        public Instancias(InvInstanciasFiltros filtros)
        {
            Filtros = filtros;

            Productos = _Lista(Filtros);
            _Totales();
        }
        public static List<ItemLista> ListaInstancias()
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_AUTO_INSTANCIAS", parameters);
            return ListaMetodos.GetList(DT);
        }


        List<InvDetalleItem> _Lista(InvInstanciasFiltros Filtros)
        {
            List<InvDetalleItem> Lista = new List<InvDetalleItem>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@F_CodInst", SqlDbType.Int, Filtros.F_CodInst)
                };
            DataTable DT = db.CallDBList("GF_DETALLE_INST_INVENTARIO", parameters);

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
                        PrincAct = item["PrincAct"].ToString(),
                        CostoSobrante = float.Parse(item["CostoSobrante"].ToString())
                    });
                }
            }

            return Lista;
        }


        void _Totales()
        {

            TotalItems = Productos.Count();

            foreach (InvDetalleItem i in Productos)
            {

                TotalExisten += i.Existen;

            }


        }

    }

}
