using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISTRAS;
using BASE;

namespace GESFARM.Controllers.SISTRAS.api
{
    public class TraspasoController : ApiController
    {

        public HttpResponseMessage GeneraJsonTraspaso()
        {

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, JsonTraspaso.GeneraJsonTraspaso());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error generando traspaso", ex.Message));
            }

        }

        public HttpResponseMessage LeeJsonTraspaso()
        {

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, JsonTraspaso.LeeJsonTraspaso());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error generando traspaso", ex.Message));
            }

        }

        public HttpResponseMessage EscribeJsonTraspaso(string json)
        {

            try
            {
                JsonTraspaso.EscribeJsonTraspaso(json);
                return Request.CreateResponse(HttpStatusCode.OK, new object { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error generando traspaso", ex.Message));
            }

        }

    }
}
