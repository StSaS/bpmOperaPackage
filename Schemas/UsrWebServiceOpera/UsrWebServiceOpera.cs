namespace Terrasoft.Configuration.UsrWebServiceOpera
{
	using System;
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	using Terrasoft.Core;
	using Terrasoft.Web.Common;
	using Terrasoft.Core.Entities;
	using System.Runtime.Serialization;
	using ServiceOpera;
	

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class UsrWebServiceOpera : BaseService
	{
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
		ResponseFormat = WebMessageFormat.Json)]
		public int GetCountPerformance(string code) 
		{	
			if (Int32.TryParse(code, out int c))
			{
            	return new OperaHandler(UserConnection).Count(c);
			} else {
				return -1;
			}
       
		}
	
	}
	
	/*[ServiceContract]
	public class MyContract 
	{
		[DataMember]
		public int x;
		
		[DataMember]
		public string y;
	}*/
} 