using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISEQUIV
{
    public class PresentacionController : Controller
    {
        // GET: Presentacion
        public ActionResult Index()
        {
            return View("~/Views/SISEQUIV/Presentacion.cshtml");
        }
    }
}