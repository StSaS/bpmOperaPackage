using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;

namespace ServiceOpera
{
    public class OperaHandler
    {
        private UserConnection _userConnection;

        public OperaHandler(UserConnection uc)
        {
            _userConnection = uc;
        }

        public int Count(int code)
        {
            var sel = new Select(_userConnection)
                .Top(1)
                .Column("Id")
                .From("UsrOperas2")
                .Where("UsrCode").IsEqual(Column.Parameter(code))
                .OrderByDesc("CreatedOn")
                as Select;

            var Id = sel.ExecuteScalar<Guid>(); // id программы
            // если count(sel) == 0 -> id == ""
            if (Id.ToString() == "00000000-0000-0000-0000-000000000000")
            {
                return -1;
            }

            var selectDetail = new Select(_userConnection)
               //.Column("UsrOperaId")
               //.Column("UsrStatusId")
               .Column("Id")
               //.Column("UsrDescription")
               .From("UsrPerformance")
               .Where("UsrOperaId").IsEqual(Column.Parameter(Id))
               .And("UsrStatusId").IsEqual(Column.Parameter(new Guid("B2F6CA61-29AC-470C-A6F4-A4FC26893E11"))) as Select;
            //.Where("UsrStatusId").IsEqual(Column.Parameter(new Guid("B2F6CA61-29AC-470C-A6F4-A4FC26893E11"))) as Select;//список для связки в детали
            int n = 0;

            using (DBExecutor dbExecutor = _userConnection.EnsureDBConnection())
            {
                using (IDataReader reader = selectDetail.ExecuteReader(dbExecutor))
                {
                    

                    while (reader.Read())
                    {
                        n++;
                    }
                }
            }

            return n;
        }
    }
}
