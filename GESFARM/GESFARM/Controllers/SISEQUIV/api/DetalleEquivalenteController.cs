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
    public class DetalleEquivalenteController : ApiController
    {
        public HttpResponseMessage Lista(Detalle Item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Item.ListaDetalleEquivalentes());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage ListaEquivalentesProducto(FiltrosEquivalentes Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Detalle.ListaEquivalentesProducto(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage ListaDetalleEquivalentesEEPP(Detalle Item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Item.ListaDetalleEquivalentesEEPP());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

        public HttpResponseMessage EquivalentesTotales(FiltrosEquivalentes Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Detalle.EquivalentesTotales(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }
    }
}
