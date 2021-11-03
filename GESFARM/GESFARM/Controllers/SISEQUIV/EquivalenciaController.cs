using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISEQUIV
{
    public class EquivalenciaController : Controller
    {
        public ActionResult Totales()
        {
            return View("~/Views/SISEQUIV/Totales.cshtml");
        }

        public ActionResult Productos()
        {
            return View("~/Views/SISEQUIV/Productos.cshtml");
        }
    }
}