using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BASE;
using SISOPER.MENSUAL;

namespace GESFARM.Controllers.SISOPER.api
{
    public class ResumenMensualController : ApiController
    {

        public HttpResponseMessage Data()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new ResumenMensual());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo detalle", ex.Message));
            }
        }

    }
}
