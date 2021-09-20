using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BASE;

namespace PARAMETROS.FACTORCAMBIO
{
    public class ItemFactorCambio
    {
        public string Fecha = string.Empty;
        public float Tasa = 0;
    }

    public static class FactorCambio
    {

        public static void Agregar(ItemFactorCambio Item)
        {
            try
            {

                Data db = new Data();

                SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,"GUARDAR"),
                    Data.NewIN("@FECHA",SqlDbType.Date,DateTime.Parse(Item.Fecha)),
                    Data.NewIN("@VALOR",SqlDbType.Decimal,Item.Tasa)
                };

                db.CallDBParameters("GF_ADM_FACTOR_CAMBIO", parameters);

            }
            catch (Exception e)
            {
                Console.WriteLine("OOPs, something went wrong.\n" + e);
            }


        }

        public static void Eliminar(ItemFactorCambio Item)
        {

            try
            {

                Data db = new Data();

                SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,"ELIMINAR"),
                    Data.NewIN("@FECHA",SqlDbType.Date,DateTime.Parse(Item.Fecha)),
                    Data.NewIN("@VALOR",SqlDbType.Decimal,Item.Tasa)
                };

                db.CallDBParameters("GF_ADM_FACTOR_CAMBIO", parameters);


            }
            catch (Exception e)
            {
                Console.WriteLine("OOPs, something went wrong.\n" + e);
            }

        }

        public static void Actualizar(ItemFactorCambio Item)
        {

            try
            {

                Data db = new Data();

                SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ACCION",SqlDbType.NVarChar,"ACTUALIZAR"),
                    Data.NewIN("@FECHA",SqlDbType.Date,DateTime.Parse(Item.Fecha)),
                    Data.NewIN("@VALOR",SqlDbType.Decimal,Item.Tasa)
                };

                db.CallDBParameters("GF_ADM_FACTOR_CAMBIO", parameters);


            }
            catch (Exception e)
            {
                Console.WriteLine("OOPs, something went wrong.\n" + e);
            }


        }

        public static List<ItemFactorCambio> Lista()
        {
            List<ItemFactorCambio> Lista = new List<ItemFactorCambio>();

            try
            {

                Data db = new Data();
                SqlParameter[] parameters = new SqlParameter[0];
                DataTable DT = db.CallDBList("GF_LISTA_FACTOR_CAMBIO", parameters);

                if (DT.Rows.Count > 0)
                {
                    foreach (DataRow item in DT.Rows)
                    {
                        Lista.Add(new ItemFactorCambio
                        {
                            Fecha = item["FC_Fecha"].ToString(),
                            Tasa = float.Parse(item["FC_Valor"].ToString())
                        });
                    }
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("OOPs, something went wrong.\n" + e);
            }



            return Lista;
        }

    }
}
