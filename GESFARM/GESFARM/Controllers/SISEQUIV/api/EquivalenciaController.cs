﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BASE;
using SISEQUIV;

namespace GESFARM.Controllers.SISEQUIV.api
{
    public class EquivalenciaController : ApiController
    {
        public HttpResponseMessage Asignar(Equivalencia Item)
        {

            try
            {
                Item.Administrar("GUARDAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error agregando equivalencia", ex.Message));
            }
        }
        public HttpResponseMessage Desvincular(Equivalencia Item)
        {
            try
            {
                Item.Administrar("ELIMINAR");
                return Request.CreateResponse(HttpStatusCode.OK, new { });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error eliminando equivalencia", ex.Message));
            }
        }
        public HttpResponseMessage ListaProdxPrincAct(Equivalencia item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, item.ListaProdxPrincAct());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }
        public HttpResponseMessage ListaPrincActXProd(Equivalencia item)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, item.ListaPrincActXProd());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new Error("Error obteniendo lista", ex.Message));
            }

        }

    }
}
