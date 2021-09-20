using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PARAMETROS.FACTORCAMBIO;

namespace GESFARM.Controllers.PARAMETROS.api
{
    public class FactorCambioController : ApiController
    {

        public IHttpActionResult Lista()
        {

            return Json(FactorCambio.Lista());
        }

        public IHttpActionResult Agregar(ItemFactorCambio Item)
        {
            Item.Fecha =  DateTime.Now.ToString();
            Item.Tasa = 1;

            FactorCambio.Agregar(Item);

            return Ok();
        }

        public IHttpActionResult Eliminar(ItemFactorCambio Item)
        {
            FactorCambio.Eliminar(Item);

            return Ok();
        }

        public IHttpActionResult Actualizar(ItemFactorCambio Item)
        {
            FactorCambio.Actualizar(Item);

            return Ok();
        }

    }
}
