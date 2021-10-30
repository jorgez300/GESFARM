using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISTRAS
{
    public class TraspasoController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/SISTRAS/Traspaso.cshtml");
        }
        public ActionResult Traspaso()
        {
            return View("~/Views/SISTRAS/Traspaso.cshtml");
        }
    }
}