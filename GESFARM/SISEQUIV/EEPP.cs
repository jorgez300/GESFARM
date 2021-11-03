using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SISEQUIV
{

    public class ProdXPr
    {

        public string CODIGO { get; set; }
        public string DESCRIPCION { get; set; }
        public int EXISTEN { get; set; }
        public int ID_PR { get; set; }
        public float COSTO { get; set; }
        public float PRECIO { get; set; }
        public string PR_DESCRIP { get; set; }
    }

    public class EEPP
    {
        public int? EEPP_PR_Id { get; set; }
        public string EEPP_CodProd { get; set; }


        public void Administrar(string Accion)
        {

            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.VarChar,Accion),
                    Data.NewIN("@PR_ID",SqlDbType.Int,EEPP_PR_Id),
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,EEPP_CodProd)
                };

            db.CallDBParameters("GF_ADM_EEPP", parameters);

        }
        public List<ProdXPr> ListaProdxPres()
        {

            List<ProdXPr> Lista = new List<ProdXPr>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar, EEPP_CodProd),
                    Data.NewIN("@PRIN_ACT",SqlDbType.Int, EEPP_PR_Id)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PROD_X_PR", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new ProdXPr
                    {
                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIPCION = item["DESCRIPCION"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        COSTO = float.Parse(item["COSTPRO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO3"].ToString()),
                        ID_PR = int.Parse(item["ID_PR"].ToString()),
                        PR_DESCRIP = item["PR_DESCRIP"].ToString()
                    });
                }
            }

            return Lista;
        }
        public List<Presentacion> ListaPresXProd()
        {

            List<Presentacion> Lista = new List<Presentacion>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,EEPP_CodProd)
                };
            DataTable DT = db.CallDBList("GF_LISTA_PR_X_PROD", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new Presentacion
                    {
                        PR_Id = int.Parse(item["PR_Id"].ToString()),
                        PR_Descrip = item["PR_Descrip"].ToString(),
                        PR_Vigencia = int.Parse(item["PR_Vigencia"].ToString())
                    });
                }
            }

            return Lista;
        }

    }
}
