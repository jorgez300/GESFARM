using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GESFARM.Controllers.SISEQUIV
{
    public class PrinActController : Controller
    {
        // GET: PrinAct
        public ActionResult PrincipioActivo()
        {
            return View("~/Views/SISEQUIV/PrinAct.cshtml");
        }
    }
}