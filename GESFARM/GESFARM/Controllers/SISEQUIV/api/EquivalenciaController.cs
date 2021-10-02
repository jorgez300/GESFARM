using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BASE;
using SISEQUIV;

namespace GESFARM.Controllers.SISEQUIV.api
{
    public class EquivalenciaController : ApiController
    {
        public HttpResponseMessage Agregar(Equivalencia Item)
        {

            try
            {
                Item.Administrar("GUARDAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando equivalencia", ex.Message));
            }
        }

        public HttpResponseMessage Eliminar(Equivalencia Item)
        {
            try
            {
                Item.Administrar("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error eliminando equivalencia", ex.Message));
            }
        }
    }
}
