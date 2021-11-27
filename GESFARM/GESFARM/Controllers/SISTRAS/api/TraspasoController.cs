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
                return Request.CreateResponse(HttpStatusCode.OK, ArchivoTraspaso.GeneraJsonTraspaso());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error generando traspaso", ex.Message));
            }

        }


        public HttpResponseMessage EscribeJsonTraspaso(VmArchivos Item)
        {

            try
            {
                Item.ArchivoFFD.GuardaTraspaso("FFD");
                Item.ArchivoMVP.GuardaTraspaso("MVP");
                Item.ArchivoVP.GuardaTraspaso("VP");
                return Request.CreateResponse(HttpStatusCode.OK, new object { });
            }
            catch (Exception ex)
            {
                Traspaso.LimpiaTraspasoTodo();
                Directorios.LimpiaCarpeta(AppDomain.CurrentDomain.BaseDirectory + @"Traspasos\Recibidos\");
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error generando traspaso", ex.Message));
            }

        }

        public HttpResponseMessage ComparacionTraspaso()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new ComparacionTraspaso());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo comparacion traspaso", ex.Message));
            }

        }

    }
}
