using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace SISEQUIV
{

    public class FiltrosEquivalentes
    {
        public string CODIGO { get; set; }
        public string EXISTEN { get; set; }
    }

    public class EquivalentesTotales
    {
        public List<Detalle> ListaEquivalentes { get; set; }
        public int? TotalItem { get; set; }
        public int? TotalEXisten { get; set; }
    }

    public class Detalle
    {
        public string CODIGO { get; set; }
        public string DESCRIPCION { get; set; }
        public int? EXISTEN { get; set; }
        public float COSTO { get; set; }
        public float PRECIO { get; set; }
        public int? ID_PR { get; set; }
        public string PR_DESCRIP { get; set; }
        public int? ID_PA { get; set; }
        public string PA_DESCRIP { get; set; }



        public List<Detalle> ListaDetalleEquivalentes()
        {
            List<Detalle> Lista = new List<Detalle>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,CODIGO),
                    Data.NewIN("@PRIN_ACT",SqlDbType.VarChar,ID_PA),
                    Data.NewIN("@PRES",SqlDbType.VarChar,ID_PR)

                };
            DataTable DT = db.CallDBList("GF_LISTA_DETALLE_PRODUCTOS", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Detalle
                    {
                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIPCION = item["DESCRIPCION"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        COSTO = float.Parse(item["COSTPRO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO3"].ToString()),
                        ID_PR = int.Parse(item["ID_PR"].ToString()),
                        PR_DESCRIP = item["PR_DESCRIP"].ToString(),
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString()
                    });
                }
            }


            return Lista;
        }

        public static List<Detalle> ListaEquivalentesProducto(FiltrosEquivalentes F)
        {
            List<Detalle> Lista = new List<Detalle>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,F.CODIGO),
                    Data.NewIN("@EXISTEN",SqlDbType.VarChar, F.EXISTEN)

                };
            DataTable DT = db.CallDBList("GF_LISTA_EQUIVALENTES_X_PROD", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Detalle
                    {
                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIPCION = item["DESCRIPCION"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        COSTO = float.Parse(item["COSTPRO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO3"].ToString()),
                        ID_PR = int.Parse(item["ID_PR"].ToString()),
                        PR_DESCRIP = item["PR_DESCRIP"].ToString(),
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString()
                    });
                }
            }


            return Lista;
        }

        public List<Detalle> ListaDetalleEquivalentesEEPP()
        {
            List<Detalle> Lista = new List<Detalle>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ID_PA",SqlDbType.Int,ID_PA),
                    Data.NewIN("@ID_PR",SqlDbType.Int,ID_PR)

                };
            DataTable DT = db.CallDBList("GF_LISTA_EQUIVALENTES_X_EEPP", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Detalle
                    {
                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIPCION = item["DESCRIPCION"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        COSTO = float.Parse(item["COSTPRO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO3"].ToString()),
                        ID_PR = int.Parse(item["ID_PR"].ToString()),
                        PR_DESCRIP = item["PR_DESCRIP"].ToString(),
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString()
                    });
                }
            }


            return Lista;
        }

        public static EquivalentesTotales EquivalentesTotales(FiltrosEquivalentes F) {

            EquivalentesTotales data = new EquivalentesTotales();

            data.ListaEquivalentes = ListaEquivalentesProducto(F);

            return data;
        }



    }
}
