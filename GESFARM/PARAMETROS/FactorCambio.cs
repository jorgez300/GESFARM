using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BASE;

namespace PARAMETROS.FACTORCAMBIO
{

    public class FactorCambio
    {
        public string Fecha { get; set; }
        public float Tasa { get; set; }

        public void Administrar(string Accion)
        {

            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,Accion),
                    Data.NewIN("@FECHA",SqlDbType.Date,DateTime.Parse(Fecha)),
                    Data.NewIN("@VALOR",SqlDbType.Decimal,Tasa)
                };

            db.CallDBParameters("GF_ADM_FACTOR_CAMBIO", parameters);



        }


        public static List<FactorCambio> Lista()
        {
            List<FactorCambio> Lista = new List<FactorCambio>();


            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[0];
            DataTable DT = db.CallDBList("GF_LISTA_FACTOR_CAMBIO", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new FactorCambio
                    {
                        Fecha = item["FC_Fecha"].ToString(),
                        Tasa = float.Parse(item["FC_Valor"].ToString())
                    });
                }
            }





            return Lista;
        }

    }
}
