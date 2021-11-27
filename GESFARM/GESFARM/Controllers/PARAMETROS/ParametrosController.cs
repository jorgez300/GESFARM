using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.PARAMETROS
{
    public class ParametrosController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/PARAMETROS/Parametros.cshtml");
        }
        public ActionResult Parametros()
        {
            return View("~/Views/PARAMETROS/Parametros.cshtml");
        }
    }
}