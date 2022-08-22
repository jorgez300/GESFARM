using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BASE;
using SISINV;

namespace GESFARM.Controllers.SISINV.api
{
    public class CostoProdController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage Parametros()
        {

            try
            {
                CostoProd Item = new CostoProd();

                Item.Parametros();
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo parametros", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage GetCostoProd([FromBody] CostoProd Item)
        {

            try
            {
                Item.GetProducto();
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage GetHistorico([FromBody] CostoProd Item)
        {

            try
            {
                Item.GetHistorico();
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage GetInstancias()
        {

            try
            {
                CostoProd Item = new CostoProd();
                Item.GetInstancias();
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage Actualizar([FromBody] CostoProd Item)
        {

            try
            {
                Item.Administrar("ACTUALIZAR");
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage Guardar([FromBody] CostoProd Item)
        {

            try
            {
                Item.Administrar("GUARDAR");
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage Eliminar([FromBody] CostoProd Item)
        {

            try
            {
                Item.Administrar("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage EliminaHist([FromBody] CostoProd Item)
        {

            try
            {
                Item.EliminaHist("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }

        [HttpPost]
        public HttpResponseMessage Calculo()
        {

            try
            {
                CostoProd Item = new CostoProd();
                Item.Calculo();
                return Request.CreateResponse(HttpStatusCode.OK, Item);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando EEPP", ex.Message));
            }
        }
    }
}
