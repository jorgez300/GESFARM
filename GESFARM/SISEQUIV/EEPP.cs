using BASE;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SISEQUIV
{
    public class EEPP
    {
        public int? EEPP_PR_Id { get; set; }
        public string EEPP_CodProd { get; set; }


        public void Administrar(string Accion) {

            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.VarChar,Accion),
                    Data.NewIN("@PA_ID",SqlDbType.Int,EEPP_PR_Id),
                    Data.NewIN("@CODPROD",SqlDbType.VarChar,EEPP_CodProd)
                };

            db.CallDBParameters("GF_ADM_EQUIVALENCIA", parameters);

        }

    }
}
