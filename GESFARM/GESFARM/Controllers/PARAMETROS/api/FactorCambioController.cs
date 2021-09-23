using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BASE;
using PARAMETROS.FACTORCAMBIO;

namespace GESFARM.Controllers.PARAMETROS.api
{
    public class FactorCambioController : ApiController
    {

        public HttpResponseMessage Lista()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, FactorCambio.Lista());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage Agregar(FactorCambio Item)
        {

            try
            {
                Item.Administrar("GUARDAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando principio activo", ex.Message));
            }
        }

        public HttpResponseMessage Eliminar(FactorCambio Item)
        {
            try
            {
                Item.Administrar("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error eliminando principio activo", ex.Message));
            }
        }

        public HttpResponseMessage Actualizar(FactorCambio Item)
        {
            try
            {
                Item.Administrar("ACTUALIZAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error actualizando principio activo", ex.Message));
            }
        }

    }
}
