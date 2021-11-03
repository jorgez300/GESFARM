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
    public class EEPPController : ApiController
    {
        public HttpResponseMessage Asignar(EEPP Item)
        {

            try
            {
                Item.Administrar("GUARDAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }
        public HttpResponseMessage Desvincular(EEPP Item)
        {
            try
            {
                Item.Administrar("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error eliminando EEPP", ex.Message));
            }
        }
        public HttpResponseMessage ListaProdxPres(EEPP item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, item.ListaProdxPres());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }    
        public HttpResponseMessage ListaPresXProd(EEPP item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, item.ListaPresXProd());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

    }
}