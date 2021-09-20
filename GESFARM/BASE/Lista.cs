using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BASE
{
    public class ItemLista
    {
        public string ID { get; set; }
        public string DSC { get; set; }
    }


    public static class ListaMetodos
    {
        public static List<ItemLista> GetList(DataTable DT)
        {

            List<ItemLista> Lista = new List<ItemLista>();


            if (DT.Rows.Count > 0)
            {
                foreach (DataRow item in DT.Rows)
                {
                    Lista.Add(new ItemLista { ID = item["ID"].ToString(), DSC = item["DSC"].ToString() });

                }
            }


            return Lista;


        }

    }

}
