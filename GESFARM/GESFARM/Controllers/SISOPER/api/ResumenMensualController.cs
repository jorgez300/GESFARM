using System.Web.Http;
using SISOPER.MENSUAL;

namespace GESFARM.Controllers.SISOPER.api
{
    public class ResumenMensualController : ApiController
    {

        public IHttpActionResult Data()
        {

            ResumenMensual Data = new ResumenMensual();


            return Json(Data);
        }

    }
}
