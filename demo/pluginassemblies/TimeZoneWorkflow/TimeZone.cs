using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;

namespace TimeZoneWorkflow
{
    public class TimeZone : CodeActivity
    {
        //Establish input and output parameters
        [RequiredArgument]
        [Input("City")]
        public InArgument<string> City { get; set; }

        [RequiredArgument]
        [Input("State")]
        public InArgument<string> State { get; set; }

        [Output("Timezone")]
        public OutArgument<string> Timezone { get; set; }

        static readonly HttpClient httpClient = new HttpClient();

        protected override void Execute(CodeActivityContext context)
        {
            ITracingService tracingService = context.GetExtension<ITracingService>();
            
            //Setting the value of Timezone by calling the GetTimeZone Method which returns a string
            Timezone.Set(context, GetTimeZone(City.Get<string>(context), State.Get<string>(context), tracingService));
        }

        public string GetTimeZone(string city, string state, ITracingService tracingService)
        {
            string key = "AqM-iGo0rGMf7tIjlvYjS8Wu4zzd8K8kP7VyFpoi49BK5nMAn9NAvAAUSpyiJY_o";
            string url = "https://dev.virtualearth.net/REST/v1/TimeZone/?query=" + city.Replace(' ', '+') + "," + state.Replace(' ', '+') + "&key=" + key;
           
            try
            {
                using (var deserializeMemoryStream = new MemoryStream()) //client
                {
                    //Send the GET request and get the response body as a string
                    var result = httpClient.GetAsync(url).Result;
                    var resultString = result.Content.ReadAsStringAsync().Result;
                    var serializer = new DataContractJsonSerializer(typeof(TimeZoneModel));
                    var writer = new StreamWriter(deserializeMemoryStream);
                    writer.Write(resultString);
                    writer.Flush();
                    deserializeMemoryStream.Position = 0;

                    //Returns deserialized object
                    var serializedObject = serializer.ReadObject(deserializeMemoryStream) as TimeZoneModel;

                    var timezone = serializedObject.ResourceSets.FirstOrDefault().Resources.FirstOrDefault().
                        TimeZoneAtLocation.FirstOrDefault().TimeZone.FirstOrDefault().ConvertedTime.TimeZoneDisplayName;
                    return timezone;
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
                return "Unable to locate timezone";
            }
        }
    }
}
