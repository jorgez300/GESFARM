using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISOPER
{
    public class MensualController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/SISOPER/Mensual/Index.cshtml");
        }
    }
}