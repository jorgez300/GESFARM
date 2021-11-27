using BASE;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SISTRAS
{
    public class Traspaso
    {

        public string ORIGEN { get; set; }
        public string FECHA { get; set; }
        public List<DetalleTraspaso> DETALLE { get; set; } = new List<DetalleTraspaso>();


        public void GetDetalleTraspaso()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] { };
            DataTable DT = db.CallDBList("GF_GENERA_DETALLE_TRASPASO", parameters);

            if (DT.Rows.Count > 0)
            {

                foreach (DataRow item in DT.Rows)
                {
                    ORIGEN = item["ORIGEN"].ToString();
                    FECHA = DateTime.Now.ToString("dd-MM-yyyy");
                    DETALLE.Add(new DetalleTraspaso
                    {

                        CODIGO = item["CODIGO"].ToString(),
                        DESCRIP = item["DESCRIP"].ToString(),
                        EXISTEN = int.Parse(item["EXISTEN"].ToString()),
                        PROMEDIO = int.Parse(item["PROMEDIO"].ToString()),
                        MINIMO = int.Parse(item["MINIMO"].ToString()),
                        MAXIMO = int.Parse(item["MAXIMO"].ToString()),
                        ID_PA = item["ID_PA"].ToString(),
                        PRINCIPIO_ACTIVO = item["PRINCIPIO_ACTIVO"].ToString(),
                        ID_PR = item["ID_PR"].ToString(),
                        PRESENTACION = item["PRESENTACION"].ToString(),
                        COSTO = float.Parse(item["COSTO"].ToString()),
                        PRECIO = float.Parse(item["PRECIO"].ToString())

                    });


                }
            }
        }

        public void LimpiaTraspaso()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                Data.NewIN("@ORIGEN",SqlDbType.NVarChar,ORIGEN)
            };
            db.CallDBParameters("GF_LIMPIA_TRASPASOS", parameters);

        }

        public static void LimpiaTraspasoTodo() {


            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] {
                Data.NewIN("@ORIGEN",SqlDbType.NVarChar,"FFD")
            };
            db.CallDBParameters("GF_LIMPIA_TRASPASOS", parameters);


            db = new Data();
             parameters = new SqlParameter[] {
                Data.NewIN("@ORIGEN",SqlDbType.NVarChar,"MVP")
            };
            db.CallDBParameters("GF_LIMPIA_TRASPASOS", parameters);


            db = new Data();
            parameters = new SqlParameter[] {
                Data.NewIN("@ORIGEN",SqlDbType.NVarChar,"VP")
            };
            db.CallDBParameters("GF_LIMPIA_TRASPASOS", parameters);


        }

        public void GuardaTraspaso()
        {

            foreach (DetalleTraspaso ITEM in DETALLE)
            {
                Data db = new Data();

                SqlParameter[] parameters = new SqlParameter[] {
                    Data.NewIN("@ORIGEN",SqlDbType.NVarChar,ORIGEN),
                    Data.NewIN("@TR_Codigo",SqlDbType.NVarChar,ITEM.CODIGO),
                    Data.NewIN("@TR_Descrip",SqlDbType.NVarChar,ITEM.DESCRIP),
                    Data.NewIN("@TR_Existen",SqlDbType.Int,ITEM.EXISTEN),
                    Data.NewIN("@TR_Promedio",SqlDbType.Int,ITEM.PROMEDIO),
                    Data.NewIN("@TR_Minimo",SqlDbType.Int,ITEM.MINIMO),
                    Data.NewIN("@TR_Maximo",SqlDbType.Int,ITEM.MAXIMO),
                    Data.NewIN("@TR_Id_Pa",SqlDbType.NVarChar,ITEM.ID_PA),
                    Data.NewIN("@TR_PrincAct",SqlDbType.NVarChar,ITEM.PRINCIPIO_ACTIVO),
                    Data.NewIN("@TR_Id_Pr",SqlDbType.NVarChar,ITEM.ID_PR),
                    Data.NewIN("@TR_Presentacion",SqlDbType.NVarChar,ITEM.PRESENTACION),
                    Data.NewIN("@TR_Costo",SqlDbType.Float,ITEM.COSTO),
                    Data.NewIN("@TR_Precio",SqlDbType.Float,ITEM.PRECIO),
                };

                db.CallDBParameters("GF_ADM_TRASPASO", parameters);

            }
        }
    }

    public class VmArchivos
    {

        public ArchivoTraspaso ArchivoMVP { get; set; }
        public ArchivoTraspaso ArchivoVP { get; set; }
        public ArchivoTraspaso ArchivoFFD { get; set; }

    }

    public class ArchivoTraspaso
    {
        public string ARCHIVO { get; set; }
        public string ORIGEN { get; set; }
        public string DATA { get; set; }

        public static ArchivoTraspaso GeneraJsonTraspaso()
        {
            Traspaso Obj = new Traspaso();
            Obj.GetDetalleTraspaso();

            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\");
            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\");

            File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\" + Obj.ORIGEN + ".json", BASE.ArchivoJson.GeneraJson(Obj));

            Byte[] bytes = File.ReadAllBytes(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\" + Obj.ORIGEN + ".json");

            return new ArchivoTraspaso
            {
                ARCHIVO = "Traspaso" + Obj.ORIGEN + ".json",
                DATA = "data:application/json;base64," + Convert.ToBase64String(bytes)
            };

        }

        public void GuardaTraspaso(string ORIGEN)
        {
            Traspaso data;
            EscribeJsonTraspaso(ORIGEN);
            data = LeeJsonTraspaso(ORIGEN);
            data.LimpiaTraspaso();
            if (data.ORIGEN == ORIGEN)
            {
                data.GuardaTraspaso();
            }
            else 
            {
                throw new InvalidOperationException("Archivos no concuerdan");
            }



        }

        void EscribeJsonTraspaso(string ORIGEN)
        {

            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\");
            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + ORIGEN + @"\");

            Directorios.LimpiaCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + ORIGEN + @"\");

            File.WriteAllBytes(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + ORIGEN + @"\Traspaso" + ORIGEN + @".json", Convert.FromBase64String(DATA.Split(',')[1]));
        }

        Traspaso LeeJsonTraspaso(string ORIGEN)
        {
            if (File.Exists(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + ORIGEN + @"\Traspaso" + ORIGEN + @".json"))
            {
                string text = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + ORIGEN + @"\Traspaso" + ORIGEN + @".json");

                return JsonConvert.DeserializeObject<Traspaso>(text);
            }
            else
            {
                throw new FileNotFoundException("No se encontro archivo de traspaso " + ORIGEN);
            }


        }

    }

    public class DetalleTraspaso
    {
        public string CODIGO { get; set; }
        public string DESCRIP { get; set; }
        public int? EXISTEN { get; set; }
        public int? PROMEDIO { get; set; }
        public int? MINIMO { get; set; }
        public int? MAXIMO { get; set; }
        public string ID_PA { get; set; }
        public string PRINCIPIO_ACTIVO { get; set; }
        public string ID_PR { get; set; }
        public string PRESENTACION { get; set; }
        public float? COSTO { get; set; }
        public float? PRECIO { get; set; }
    }

    public class ItemComparacionTraspaso
    {

        public string BASE_TR_Codigo { get; set; }
        public string FFD_TR_Descrip { get; set; }
        public int? FFD_TR_Existen { get; set; }
        public int? FFD_TR_Promedio { get; set; }
        public int? FFD_TR_Minimo { get; set; }
        public int? FFD_TR_Maximo { get; set; }
        public string FFD_TR_Id_Pa { get; set; }
        public string FFD_TR_PrincAct { get; set; }
        public string FFD_TR_Id_Pr { get; set; }
        public string FFD_TR_Presentacion { get; set; }
        public float? FFD_TR_Costo { get; set; }
        public float? FFD_TR_Precio { get; set; }
        public string MVP_TR_Descrip { get; set; }
        public int? MVP_TR_Existen { get; set; }
        public int? MVP_TR_Promedio { get; set; }
        public int? MVP_TR_Minimo { get; set; }
        public int? MVP_TR_Maximo { get; set; }
        public string MVP_TR_Id_Pa { get; set; }
        public string MVP_TR_PrincAct { get; set; }
        public string MVP_TR_Id_Pr { get; set; }
        public string MVP_TR_Presentacion { get; set; }
        public float? MVP_TR_Costo { get; set; }
        public float? MVP_TR_Precio { get; set; }
        public string VP_TR_Descrip { get; set; }
        public int? VP_TR_Existen { get; set; }
        public int? VP_TR_Promedio { get; set; }
        public int? VP_TR_Minimo { get; set; }
        public int? VP_TR_Maximo { get; set; }
        public string VP_TR_Id_Pa { get; set; }
        public string VP_TR_PrincAct { get; set; }
        public string VP_TR_Id_Pr { get; set; }
        public string VP_TR_Presentacion { get; set; }
        public float? VP_TR_Costo { get; set; }
        public float? VP_TR_Precio { get; set; }




    }
    public class ComparacionTraspaso
    {


        public List<ItemComparacionTraspaso> COMPARACION { get; set; } = new List<ItemComparacionTraspaso>();

        public ComparacionTraspaso()
        {
            GetComparacionTraspaso();
        }

        void GetComparacionTraspaso()
        {

            Data db = new Data();
            SqlParameter[] parameters = new SqlParameter[] { };
            DataTable DT = db.CallDBList("GF_COMPARA_TRASPASOS", parameters);

            if (DT.Rows.Count > 0)
            {

                foreach (DataRow item in DT.Rows)
                {
                    COMPARACION.Add(new ItemComparacionTraspaso
                    {

                        BASE_TR_Codigo = item["BASE_TR_Codigo"].ToString(),
                        FFD_TR_Descrip = item["FFD_TR_Descrip"].ToString(),
                        FFD_TR_Existen = int.Parse(item["FFD_TR_Existen"].ToString()),
                        FFD_TR_Promedio = int.Parse(item["FFD_TR_Promedio"].ToString()),
                        FFD_TR_Minimo = int.Parse(item["FFD_TR_Minimo"].ToString()),
                        FFD_TR_Maximo = int.Parse(item["FFD_TR_Maximo"].ToString()),
                        FFD_TR_Id_Pa = item["FFD_TR_Id_Pa"].ToString(),
                        FFD_TR_PrincAct = item["FFD_TR_PrincAct"].ToString(),
                        FFD_TR_Id_Pr = item["FFD_TR_Id_Pr"].ToString(),
                        FFD_TR_Presentacion = item["FFD_TR_Presentacion"].ToString(),
                        FFD_TR_Costo = float.Parse(item["FFD_TR_Costo"].ToString()),
                        FFD_TR_Precio = float.Parse(item["FFD_TR_Precio"].ToString()),
                        MVP_TR_Descrip = item["MVP_TR_Descrip"].ToString(),
                        MVP_TR_Existen = int.Parse(item["MVP_TR_Existen"].ToString()),
                        MVP_TR_Promedio = int.Parse(item["MVP_TR_Promedio"].ToString()),
                        MVP_TR_Minimo = int.Parse(item["MVP_TR_Minimo"].ToString()),
                        MVP_TR_Maximo = int.Parse(item["MVP_TR_Maximo"].ToString()),
                        MVP_TR_Id_Pa = item["MVP_TR_Id_Pa"].ToString(),
                        MVP_TR_PrincAct = item["MVP_TR_PrincAct"].ToString(),
                        MVP_TR_Id_Pr = item["MVP_TR_Id_Pr"].ToString(),
                        MVP_TR_Presentacion = item["MVP_TR_Presentacion"].ToString(),
                        MVP_TR_Costo = float.Parse(item["MVP_TR_Costo"].ToString()),
                        MVP_TR_Precio = float.Parse(item["MVP_TR_Precio"].ToString()),
                        VP_TR_Descrip = item["VP_TR_Descrip"].ToString(),
                        VP_TR_Existen = int.Parse(item["VP_TR_Existen"].ToString()),
                        VP_TR_Promedio = int.Parse(item["VP_TR_Promedio"].ToString()),
                        VP_TR_Minimo = int.Parse(item["VP_TR_Minimo"].ToString()),
                        VP_TR_Maximo = int.Parse(item["VP_TR_Maximo"].ToString()),
                        VP_TR_Id_Pa = item["VP_TR_Id_Pa"].ToString(),
                        VP_TR_PrincAct = item["VP_TR_PrincAct"].ToString(),
                        VP_TR_Id_Pr = item["VP_TR_Id_Pr"].ToString(),
                        VP_TR_Presentacion = item["VP_TR_Presentacion"].ToString(),
                        VP_TR_Costo = float.Parse(item["VP_TR_Costo"].ToString()),
                        VP_TR_Precio = float.Parse(item["VP_TR_Precio"].ToString()),

                    });


                }
            }
        }

    }

}
