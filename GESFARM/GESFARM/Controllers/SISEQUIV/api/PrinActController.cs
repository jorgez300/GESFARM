using System;
using System.Web.Http;
using SISEQUIV;
using BASE;
using System.Net.Http;
using System.Net;

namespace GESFARM.Controllers.SISEQUIV.api
{
    public class PrinActController : ApiController
    {
        public HttpResponseMessage Lista(FiltrosPrinActivo Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, PrincipioActivo.Lista(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage Agregar(PrincipioActivo Item)
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

        public HttpResponseMessage Eliminar(PrincipioActivo Item)
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

        public HttpResponseMessage Actualizar(PrincipioActivo Item)
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
        public HttpResponseMessage ListaPrincipioActivo()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Listas_Pa_X_Prod.ListaPrincipioActivo());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista de principios activos", ex.Message));
            }
        }

    }
}
