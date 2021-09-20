using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISINV
{
    public class InventarioController : Controller
    {

        public ActionResult Index()
        {
            return View("~/Views/SISINV/Inventario/MinMax.cshtml");

        }


        public ActionResult MinMax()
        {
            return View("~/Views/SISINV/Inventario/MinMax.cshtml");
        }



        public ActionResult Detalle()
        {

            return View("~/Views/SISINV/Inventario/Detalle.cshtml");

        }

    }
}