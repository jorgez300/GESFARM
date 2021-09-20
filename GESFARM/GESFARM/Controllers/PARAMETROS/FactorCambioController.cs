using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.PARAMETROS
{
    public class FactorCambioController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/PARAMETROS/FactorCambio/FactorCambio.cshtml");
        }
        public ActionResult FactorCambio()
        {
            return View("~/Views/PARAMETROS/FactorCambio/FactorCambio.cshtml");
        }
    }
}