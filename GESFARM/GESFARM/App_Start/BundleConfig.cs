using System.Web;
using System.Web.Optimization;

namespace GESFARM
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.6.0.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryUI").Include(
                        "~/Scripts/jqueryui.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/Comun").Include(
                        "~/JS/Comun.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bs/bootstrap.bundle.min.js",
                      "~/Scripts/toastr.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/chart").Include(
                       "~/Scripts/chart.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/mCustomScrollbar").Include(
                       "~/Scripts/jquery.mCustomScrollbar.concat.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(                  
                      "~/Content/bs/bootstrap.min.css",
                      "~/Content/themes/base/jquery-ui.min.css",
                      "~/Content/jquery.mCustomScrollbar.min.css",
                      "~/Content/toastr.min.css",
                      "~/Content/site.css"));





            bundles.Add(new ScriptBundle("~/bundles/InvDetalle").Include(
                       "~/JS/SISINV/InventarioService.js",
                       "~/JS/SISINV/Detalle.js"));

            bundles.Add(new ScriptBundle("~/bundles/Fallas").Include(
                       "~/JS/SISINV/InventarioService.js",
                       "~/JS/SISINV/Fallas.js"));

            bundles.Add(new ScriptBundle("~/bundles/InvMinMax").Include(
                       "~/JS/SISINV/InventarioService.js",
                       "~/JS/SISINV/MinMax.js"));

            bundles.Add(new ScriptBundle("~/bundles/InvInstancias").Include(
                       "~/JS/SISINV/InventarioService.js",
                       "~/JS/SISINV/Instancias.js"));

            bundles.Add(new ScriptBundle("~/bundles/Traspaso").Include(
                       "~/JS/SISTRAS/TraspasoService.js",
                       "~/JS/SISTRAS/Traspaso.js"));


            bundles.Add(new ScriptBundle("~/bundles/ResumenMensual").Include(
                       "~/JS/SISOPER/ResumenMensual/ResumenMensualService.js",
                       "~/JS/SISOPER/ResumenMensual/ResumenMensual.js"));

            bundles.Add(new ScriptBundle("~/bundles/ResumenDiario").Include(
                       "~/JS/SISOPER/ResumenDiario/ResumenDiarioService.js",
                       "~/JS/SISOPER/ResumenDiario/ResumenDiario.js"));

            bundles.Add(new ScriptBundle("~/bundles/FactorCambio").Include(
                       "~/JS/PARAMETROS/FactorCambio/FactorCambioService.js",
                       "~/JS/PARAMETROS/FactorCambio/FactorCambio.js"));

            bundles.Add(new ScriptBundle("~/bundles/Costos").Include(
                       "~/JS/SISCOS/CostosService.js",
                       "~/JS/SISCOS/Costos.js"));

            bundles.Add(new ScriptBundle("~/bundles/ClasificacionCostos").Include(
                       "~/JS/SISCOS/CostosService.js",
                       "~/JS/SISCOS/Clasificacion.js"));

            bundles.Add(new ScriptBundle("~/bundles/PrinAct").Include(
                       "~/JS/SISEQUIV/EquivalenciaService.js",
                       "~/JS/SISEQUIV/PrinAct.js"));

            bundles.Add(new ScriptBundle("~/bundles/Presentacion").Include(
                       "~/JS/SISEQUIV/EquivalenciaService.js",
                       "~/JS/SISEQUIV/Presentacion.js"));

            bundles.Add(new ScriptBundle("~/bundles/EquivTotales").Include(
                       "~/JS/SISEQUIV/EquivalenciaService.js",
                       "~/JS/SISEQUIV/Totales.js"));

            bundles.Add(new ScriptBundle("~/bundles/EquivProductos").Include(
                       "~/JS/SISEQUIV/EquivalenciaService.js",
                       "~/JS/SISEQUIV/Productos.js"));

            bundles.Add(new ScriptBundle("~/bundles/Parametro").Include(
                       "~/JS/PARAMETROS/Parametro/ParametroService.js",
                       "~/JS/PARAMETROS/Parametro/Parametro.js"));

        }
    }
}
