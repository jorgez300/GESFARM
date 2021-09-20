using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISOPER
{
    public class DiarioController : Controller
    {
        // GET: Diario
        public ActionResult Index()
        {
            return View("~/Views/SISOPER/Diario/Index.cshtml");
        }

    }
}