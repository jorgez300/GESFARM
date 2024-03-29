﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISINV.DETALLE;
using SISINV.PRODUCTOS;
using SISEQUIV;
using BASE;


namespace GESFARM.Controllers.SISINV.api
{
    public class InventarioController : ApiController
    {


        // POST api/values
        public HttpResponseMessage Detalle([FromBody] InvDetalleFiltros Filtros)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new InvDetalle(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo detalle", ex.Message));
            }


        }



        public HttpResponseMessage MinMax([FromBody] InvMinMaxFiltros Filtros)
        {

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, new InvMinMax(Filtros));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo minimos y maximos", ex.Message));
            }

        }

        public HttpResponseMessage ReportarFalla([FromBody] Falla item)
        {

            try
            {
                item.Registrar();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error reportando falla", ex.Message));
            }

        }

        public HttpResponseMessage ListaFallas([FromBody] Falla item)
        {

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, item.ListaFallas());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error listando fallas", ex.Message));
            }

        }

        public HttpResponseMessage ListaProductos()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Productos.ListaProductos());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista de productos", ex.Message));
            }
        }

        public HttpResponseMessage ListaProveedores()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, Productos.ListaProveedores());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista de productos", ex.Message));
            }
        }

    }
}
