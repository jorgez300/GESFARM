using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BASE;
using SISINV;

namespace SISTRAS
{

    public class ComparacionTraspaso { 
    
    }

    public static class JsonTraspaso
    {


        public static string GeneraJsonTraspaso()
        {
            Traspaso Obj = new Traspaso();

            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\");
            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\");

            File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\" + Obj.Centro + ".json", BASE.ArchivoJson.GeneraJson(Obj));

            Byte[] bytes = File.ReadAllBytes(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Generados\" + Obj.Centro + ".json");

            return "data:application/json;base64," + Convert.ToBase64String(bytes);

        }

        public static void EscribeJsonTraspaso(string Json)
        {

            Traspaso Obj = BASE.ArchivoJson.GeneraObjeto(Json);

            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\");
            Directorios.CrearCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\");

            File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\" + Obj.Centro + ".json", BASE.ArchivoJson.GeneraJson(Obj));

        }

        public static ComparacionTraspaso LeeJsonTraspaso()
        {
            if (!Directory.Exists(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\MVP.json"))
            {
                string JSON = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\MVP.json");
                Traspaso Obj = BASE.ArchivoJson.GeneraObjeto(JSON);
            }

            return new ComparacionTraspaso();
        }

    }

    public class Traspaso
    {


        public string Centro { get; } = "MVP";
        public string Fecha { get; } = DateTime.Now.ToString();
        public List<SISINV.DETALLE.InvMinMaxItem> ListaProductos { get; set; }

        public Traspaso()
        {
            ListaProductos = new SISINV.DETALLE.InvMinMax(new SISINV.DETALLE.InvMinMaxFiltros() { F_Accion = "T" }).Lista;
        }


    }
}
