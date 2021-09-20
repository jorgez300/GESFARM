using System.Web.Http;
using SISOPER.DIARIO;

namespace GESFARM.Controllers.SISOPER.api
{
    public class ResumenDiarioController : ApiController
    {
        public IHttpActionResult Data()
        {

            ResumenDiario Data = new ResumenDiario();


            return Json(Data);
        }
    }
}
