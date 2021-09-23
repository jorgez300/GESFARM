using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISOPER.DIARIO;
using BASE;
using System;

namespace GESFARM.Controllers.SISOPER.api
{
    public class ResumenDiarioController : ApiController
    {
        public HttpResponseMessage Data()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new ResumenDiario());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo detalle", ex.Message));
            }
        }
    }
}
