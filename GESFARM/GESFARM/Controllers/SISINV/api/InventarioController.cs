using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SISINV.DETALLE;
using SISINV.PRODUCTOS;


namespace GESFARM.Controllers.SISINV.api
{
    public class InventarioController : ApiController
    {


        // POST api/values
        public IHttpActionResult Detalle([FromBody]  InvDetalleFiltros Filtros)
        {

            InvDetalle Data = new InvDetalle(Filtros);


            return Json(Data);
        }



        public IHttpActionResult MinMax([FromBody] InvMinMaxFiltros Filtros)
        {

            InvMinMax Data = new InvMinMax(Filtros);


            return Json(Data);
        }

        public IHttpActionResult ListaProductos()
        {
            return Json(Productos.ListaProductos());
        }
    }
}
