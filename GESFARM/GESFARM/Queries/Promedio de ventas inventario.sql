select c.CodProd, c.Descrip, sum(b.Cantidad) as SeVenden, d.Existen, (sum(b.Cantidad) * 0.5) Minimo, (sum(b.Cantidad) * 1.5) Maximo, (d.Existen - sum(b.Cantidad)) as Sobran, ((d.Existen - sum(b.Cantidad)) * c.CostAct) as CostoSobrante 
from SAFACT a, SAITEMFAC b, SAPROD c, SAEXIS d where 
a.NumeroD = b.NumeroD and
b.CodItem = c.CodProd and
c.CodProd = d.CodProd and
a.FechaE >= dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)) and
a.Signo = 1 and 
a.TipoFac in ('A', 'C') and
d.CodUbic is not null
group by c.CodProd, c.Descrip, d.Existen, c.CostAct
order by Sobran desc


select  YEAR(a.FechaE) Anio ,MONTH(a.FechaE) Mes ,c.CodProd, c.Descrip, sum(b.Cantidad) Vendidos from SAFACT a, SAITEMFAC b, SAPROD c
where 
a.NumeroD = b.NumeroD and
b.CodItem = c.CodProd and
a.FechaE >= dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)) 
group by MONTH(a.FechaE), YEAR(a.FechaE),c.CodProd, c.Descrip
order by c.CodProd, YEAR(a.FechaE), MONTH(a.FechaE)

GLUCOFAGE500MG

JERINGINSUGRIS



select * from SAFACT
where 


SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth


SELECT dateadd(month, -6, DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0))
