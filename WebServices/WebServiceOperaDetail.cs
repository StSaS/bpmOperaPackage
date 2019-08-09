using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;

using System.Threading.Tasks;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;

namespace WebServiceOperaDetail
{
    public class OperaDetailHandler
    {
        private UserConnection _userConnection;

        public OperaDetailHandler(UserConnection uc)
        {
            _userConnection = uc;
        }

        public void addEveryDay(string guid)
        {
            DateTime date = DateTime.Now;
            

            for (int i = 0; i < 8; i++)
            {
                var ins = new Insert(_userConnection)
                            .Into("UsrPerformance")
                            .Set("UsrStatusId", Column.Parameter(new Guid("B2F6CA61-29AC-470C-A6F4-A4FC26893E11")))
                            .Set("UsrOperaId", Column.Parameter(new Guid(guid)))
                            .Set("UsrDate", Column.Parameter(date.ToString("yyyy-MM-dd")));

                var affectedRows = ins.Execute();

                date = date.AddDays(1);
            }

           
        }

        public void addEveryWeak(string guid)
        {
            DateTime date = DateTime.Now;


            for (int i = 0; i < 8; i++)
            {
                var ins = new Insert(_userConnection)
                            .Into("UsrPerformance")
                            .Set("UsrStatusId", Column.Parameter(new Guid("B2F6CA61-29AC-470C-A6F4-A4FC26893E11")))
                            .Set("UsrOperaId", Column.Parameter(new Guid(guid)))
                            .Set("UsrDate", Column.Parameter(date.ToString("yyyy-MM-dd")));

                var affectedRows = ins.Execute();

                date = date.AddDays(7);
            }


        }

        public void addEveryMonth(string guid)
        {
            DateTime date = DateTime.Now;


            for (int i = 0; i < 8; i++)
            {
                var ins = new Insert(_userConnection)
                            .Into("UsrPerformance")
                            .Set("UsrStatusId", Column.Parameter(new Guid("B2F6CA61-29AC-470C-A6F4-A4FC26893E11")))
                            .Set("UsrOperaId", Column.Parameter(new Guid(guid)))
                            .Set("UsrDate", Column.Parameter(date.ToString("yyyy-MM-dd")));

                var affectedRows = ins.Execute();

                date = date.AddMonths(1);
            }


        }
    }
}
