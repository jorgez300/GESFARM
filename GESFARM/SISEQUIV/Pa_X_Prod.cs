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
    public class Filtros_Pa_X_Prod
    {
        public string CODPROD { get; set; } = null;
        public int? PRIN_ACT { get; set; } = null;

    }

    public class Filtros_Equivalentes
    {
        public string F_CodProd { get; set; } = null;

    }

    public class EquivalentesTotales
    {
        public int? TotalItem { get; set; } = 0;
        public int? TotalEXisten { get; set; } = 0;
        public List<Pa_X_Prod> ListaEquivalentes { get; set; } = new List<Pa_X_Prod>();



        public EquivalentesTotales(Filtros_Equivalentes F)
        {
            ListaEquivalentes = Pa_X_Prod.ListaEquivalentes(F);
            TotalesEquivalentes(F);
        }

        private void TotalesEquivalentes(Filtros_Equivalentes F)
        {
            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,F.F_CodProd)
                };
            DataTable DT = db.CallDBList("GF_LISTA_TOTALES_EQUIVALENTES", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    if (item["TITULO"].ToString() == "TOTALESITEM")
                    {
                        TotalItem = int.Parse(item["VALOR"].ToString());
                    }

                    if (item["TITULO"].ToString() == "TOTALESEXISTEN")
                    {
                        TotalEXisten = int.Parse(item["VALOR"].ToString());
                    }
                }
            }
        }

    }

    public class Pa_X_Prod
    {

        public string CODIGO { get; set; }
        public string DESCRIPCION { get; set; }
        public int EXISTEN { get; set; }
        public int ID_PA { get; set; }
        public float COSTO { get; set; }
        public float PRECIO { get; set; }
        public string PA_DESCRIP { get; set; }

        public static List<Pa_X_Prod> ListaProdxPrincAct(Filtros_Pa_X_Prod F)
        {

            List<Pa_X_Prod> Lista = new List<Pa_X_Prod>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,F.CODPROD),
                    Data.NewIN("@PRIN_ACT",SqlDbType.Int,F.PRIN_ACT)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PROD_X_PA", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Pa_X_Prod
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


        public static List<Pa_X_Prod> ListaEquivalentes(Filtros_Equivalentes F)
        {
            List<Pa_X_Prod> Lista = new List<Pa_X_Prod>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,F.F_CodProd),
                    Data.NewIN("@EXISTEN",SqlDbType.VarChar,'T')

                };
            DataTable DT = db.CallDBList("GF_LISTA_EQUIVALENTES_X_PROD", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Pa_X_Prod
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


    }

    public class Filtros_Totales_Pa_X_Prod
    {
        public string EXISTEN { get; set; } = null;
        public int? PRIN_ACT { get; set; } = null;

    }
    public class Totales_Pa_X_Prod
    {

        public int ID_PA { get; set; }
        public string PA_DESCRIP { get; set; }
        public int PROD_X_PA { get; set; }
        public int TOTAL { get; set; }

        public static List<Totales_Pa_X_Prod> ListaTotalesProdxPrincAct(Filtros_Totales_Pa_X_Prod F)
        {

            List<Totales_Pa_X_Prod> Lista = new List<Totales_Pa_X_Prod>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@EXISTEN",SqlDbType.VarChar,F.EXISTEN),
                    Data.NewIN("@PRIN_ACT",SqlDbType.Int,F.PRIN_ACT)
                };
            DataTable DT = db.CallDBList("GF_LISTA_TOTALES_PROD_X_PA", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Totales_Pa_X_Prod
                    {
                        ID_PA = int.Parse(item["ID_PA"].ToString()),
                        PA_DESCRIP = item["PA_DESCRIP"].ToString(),
                        PROD_X_PA = int.Parse(item["PROD_X_PA"].ToString()),
                        TOTAL = int.Parse(item["TOTAL"].ToString())
                    });
                }
            }

            return Lista;
        }



    }

    public static class Listas_Pa_X_Prod
    {

        public static List<ItemLista> ListaPrincipioActivo()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_AUTO_PRIN_ACT", parameters);

            return ListaMetodos.GetList(DT);

        }

    }
}
