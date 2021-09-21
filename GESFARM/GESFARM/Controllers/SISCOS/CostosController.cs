using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISCOS
{
    public class CostosController : Controller
    {
        // GET: Costos
        public ActionResult Index()
        {
            return View("~/Views/SISCOS/Costos.cshtml");
        }

        public ActionResult Administrar()
        {
            return View("~/Views/SISCOS/Costos.cshtml");
        }

        public ActionResult Clasificacion()
        {
            return View("~/Views/SISCOS/ClasificacionCostos.cshtml");
        }
    }
}