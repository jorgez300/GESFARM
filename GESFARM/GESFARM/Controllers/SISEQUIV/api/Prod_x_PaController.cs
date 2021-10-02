using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISEQUIV;
using BASE;

namespace GESFARM.Controllers.SISEQUIV.api
{
    public class Prod_x_PaController : ApiController
    {

        public HttpResponseMessage ListaProdxPrincAct(Filtros_Pa_X_Prod Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Pa_X_Prod.ListaProdxPrincAct(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage ListaTotalesProdxPrincAct(Filtros_Totales_Pa_X_Prod Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Totales_Pa_X_Prod.ListaTotalesProdxPrincAct(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage ListaEquivalentes(Filtros_Equivalentes Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Pa_X_Prod.ListaEquivalentes(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

    }
}
