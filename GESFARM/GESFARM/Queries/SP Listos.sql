
drop procedure GF_DETALLE_INVENTARIO;

CREATE PROCEDURE GF_DETALLE_INVENTARIO
   @F_Anio nvarchar(5),
   @F_Mes nvarchar(3),
   @F_CodProd nvarchar(60)
AS
BEGIN
	select TOP 1 c.CodProd, c.Descrip, sum(b.Cantidad) as SeVenden, d.Existen, (sum(b.Cantidad) * 0.5) Minimo, (sum(b.Cantidad) * 1.5) Maximo, (d.Existen - (sum(b.Cantidad) * 1.5)) as Sobran, ((d.Existen - sum(b.Cantidad)) * c.CostAct) as CostoSobrante 
	from SAFACT a, SAITEMFAC b, SAPROD c, SAEXIS d where 
	a.NumeroD = b.NumeroD and
	b.CodItem = c.CodProd and
	c.CodProd = d.CodProd and
	a.FechaE >= dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)) and
	a.FechaE < DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) and
	a.Signo = 1 and 
	a.TipoFac in ('A', 'C') and
	d.CodUbic is not null AND
	B.CodItem = @F_CodProd
	group by c.CodProd, c.Descrip, d.Existen, c.CostAct
	order by Sobran desc
END
GO



drop procedure GF_PROMEDIO_INVENTARIO;

CREATE PROCEDURE GF_PROMEDIO_INVENTARIO
   @F_CodProd nvarchar(60)
AS
BEGIN
	select  YEAR(a.FechaE) Anio ,MONTH(a.FechaE) Mes ,c.CodProd, c.Descrip, sum(b.Cantidad) Vendidos from SAFACT a, SAITEMFAC b, SAPROD c
	where 
	a.NumeroD = b.NumeroD and
	b.CodItem = c.CodProd and
	a.FechaE >= dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)) AND
	a.FechaE < DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) and
	B.CodItem = @F_CodProd
	group by MONTH(a.FechaE), YEAR(a.FechaE),c.CodProd, c.Descrip
	order by c.CodProd, YEAR(a.FechaE), MONTH(a.FechaE)
END
GO


drop procedure GF_MINMAX_INVENTARIO;

CREATE PROCEDURE GF_MINMAX_INVENTARIO
   @F_Anio nvarchar(5),
   @F_Mes nvarchar(3),
   @F_CodProd nvarchar(60)
AS
BEGIN
	select c.CodProd, c.Descrip, sum(b.Cantidad) as SeVenden, d.Existen, (sum(b.Cantidad) * 0.5) Minimo, (sum(b.Cantidad) * 1.5) Maximo, (d.Existen - (sum(b.Cantidad) * 1.5)) as Sobran, ((d.Existen - sum(b.Cantidad)) * c.CostAct) as CostoSobrante 
	from SAFACT a, SAITEMFAC b, SAPROD c, SAEXIS d where 
	a.NumeroD = b.NumeroD and
	b.CodItem = c.CodProd and
	c.CodProd = d.CodProd and
	a.FechaE >= dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)) and
	a.FechaE < DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) and
	a.Signo = 1 and 
	a.TipoFac in ('A', 'C') and
	d.CodUbic is not null AND
	B.CodItem = @F_CodProd
	group by c.CodProd, c.Descrip, d.Existen, c.CostAct
	order by Sobran desc
END
GO