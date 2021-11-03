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
    public class TotalesController : ApiController
    {
        public HttpResponseMessage ListaTotales(FiltrosTotales Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, ItemTotales.ListaTotales(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }


    }
}
