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
    public class PresentacionController : ApiController
    {

        public HttpResponseMessage Lista(Presentacion Item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Item.Lista());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage Agregar(Presentacion Item)
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

        public HttpResponseMessage Eliminar(Presentacion Item)
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

        public HttpResponseMessage Actualizar(Presentacion Item)
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
        public HttpResponseMessage Auto()
        {
            try
            {
                Presentacion Item = new Presentacion();
                return Request.CreateResponse(HttpStatusCode.OK, Item.Auto());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error actualizando principio activo", ex.Message));
            }
        }
    }
}
