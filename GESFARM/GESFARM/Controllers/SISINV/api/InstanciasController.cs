using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISINV.INSTANCIA;
using BASE;

namespace GESFARM.Controllers.SISINV.api
{
    public class InstanciasController : ApiController
    {

        // POST api/values
        public HttpResponseMessage Detalle([FromBody] InvInstanciasFiltros Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new Instancias(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo detalle", ex.Message));
            }

        }



        public HttpResponseMessage ListaInstancias()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Instancias.ListaInstancias());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista de instancias", ex.Message));
            }
        }
    }
}
