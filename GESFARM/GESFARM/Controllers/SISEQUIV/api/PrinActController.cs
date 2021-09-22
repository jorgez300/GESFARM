using System;
using System.Web.Http;
using SISEQUIV;
using BASE;

namespace GESFARM.Controllers.SISEQUIV.api
{
    public class PrinActController : ApiController
    {
        public IHttpActionResult Lista(FiltrosPrinActivo Filtros)
        {
            try
            {
                PrincipioActivo obj = new PrincipioActivo();
                return Json(obj.Lista(Filtros));
            }
            catch (Exception ex)
            {
                return Json(new Error("Error obteniendo lista", ex.Message));
            }

        }

        public IHttpActionResult Agregar(PrincipioActivo Item)
        {
            try
            {
                Item.Administrar("GUARDAR");
                return Ok();
            }
            catch (Exception ex)
            {
                return Json(new Error("Error agregando principio activo", ex.Message));
            }
        }

        public IHttpActionResult Eliminar(PrincipioActivo Item)
        {
            try
            {
                Item.Administrar("ELIMINAR");
                return Ok();
            }
            catch (Exception ex)
            {
                return Json(new Error("Error eliminando principio activo", ex.Message));
            }
        }

        public IHttpActionResult Actualizar(PrincipioActivo Item)
        {
            try
            {
                Item.Administrar("ACTUALIZAR");
                return Ok();
            }
            catch (Exception ex)
            {
                return Json(new Error("Error actualizando principio activo", ex.Message));
            }
        }

    }
}
