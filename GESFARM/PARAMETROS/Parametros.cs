using BASE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PARAMETROS
{
    public class Parametro
    {
        public string PAR_Id { get; set; }
        public decimal? PAR_Valor_Numerico { get; set; }
        public string PAR_Valor_Texto { get; set; }


        public void Administrar(string Accion)
        {
            Data db = new Data();

            SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,Accion),
                    Data.NewIN("@ID",SqlDbType.VarChar,PAR_Id),
                    Data.NewIN("@VALOR_N",SqlDbType.Decimal,PAR_Valor_Numerico),
                    Data.NewIN("@VALOR_T",SqlDbType.VarChar,PAR_Valor_Texto)
                };

            db.CallDBParameters("GF_ADM_PARAMETRO", parameters);

        }

        public static List<Parametro> Lista()
        {
            List<Parametro> Lista = new List<Parametro>();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] { };
            DataTable DT = db.CallDBList("GF_LISTA_PARAMETROS", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    if (item["PAR_Valor_Numerico"].ToString() == String.Empty)
                    {
                        Lista.Add(new Parametro
                        {
                            PAR_Id = item["PAR_Id"].ToString(),
                            PAR_Valor_Numerico = null,
                            PAR_Valor_Texto = item["PAR_Valor_Texto"].ToString()
                        });
                    }
                    else
                    {
                        Lista.Add(new Parametro
                        {
                            PAR_Id = item["PAR_Id"].ToString(),
                            PAR_Valor_Numerico = Decimal.Parse(item["PAR_Valor_Numerico"].ToString()),
                            PAR_Valor_Texto = null
                        });
                    }


                }
            }


            return Lista;
        }

        public static Parametro Retorna(string Nombre)
        {
           Parametro Item = new Parametro();

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] { };
            DataTable DT = db.CallDBList("GF_LISTA_PARAMETROS", parameters);

            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {

                    if (item["PAR_Id"].ToString() == Nombre)
                    {

                        if (item["PAR_Valor_Numerico"].ToString() == String.Empty)
                        {
                            Item = new Parametro
                            {
                                PAR_Id = item["PAR_Id"].ToString(),
                                PAR_Valor_Numerico = null,
                                PAR_Valor_Texto = item["PAR_Valor_Texto"].ToString()
                            };
                        }
                        else
                        {
                            Item = new Parametro
                            {
                                PAR_Id = item["PAR_Id"].ToString(),
                                PAR_Valor_Numerico = Decimal.Parse(item["PAR_Valor_Numerico"].ToString()),
                                PAR_Valor_Texto = null
                            };
                        }
                    }

                }
            }

            return Item;
        }


    }
}
