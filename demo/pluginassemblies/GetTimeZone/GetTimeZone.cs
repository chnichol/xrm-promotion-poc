using System;
using System.Activities;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;

namespace GetTimeZone
{
    public class GetTimeZone : CodeActivity
    {        
        [Input(nameof(InputAddressCity)), RequiredArgument]
        public InArgument<string> InputAddressCity { get; set; }

        [Input(nameof(InputAddressState)), RequiredArgument]
        public InArgument<string> InputAddressState { get; set; }

        [Input(nameof(InputAddressStreet)), RequiredArgument]
        public InArgument<string> InputAddressStreet { get; set; }

        [Input(nameof(InputAddressZip)), RequiredArgument]
        public InArgument<string> InputAddressZip{ get; set; }
        
        [Output(nameof(TimeZoneCode))]
        public OutArgument<int> TimeZoneCode { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var tracingService = context.GetExtension<ITracingService>();            

            TimeZoneCode.Set(context, 0);

            Run(context, tracingService).Wait();
        }

        private async Task Run(CodeActivityContext context, ITracingService tracingService)
        {
            try
            {
                var address = new Address
                {
                    City = InputAddressCity.Get<string>(context),
                    State = InputAddressState.Get<string>(context),
                    Street = InputAddressStreet.Get<string>(context),
                    Zip = InputAddressStreet.Get<string>(context)
                };

                using (var httpClient = new HttpClient())
                {
                    var bingMapsClient = new BingMapsClient(httpClient, "{{apiKeys.bingMaps}}");
                    var timeZoneResponse = await bingMapsClient.QueryTimeZone(address);

                    var timeZone = timeZoneResponse?.ResourceSets.FirstOrDefault() is ResourceSet resourceSet &&
                            resourceSet.Resources.FirstOrDefault() is Resource resource &&
                            resource.TimeZoneAtLocation.FirstOrDefault() is TimeZoneAtLocation timeZoneAtLocation &&
                            timeZoneAtLocation.TimeZone.FirstOrDefault() is Timezone timeZoneElement &&
                            timeZoneElement.IanaTimeZoneId is string ianaName
                        ? TimeZoneMap.GetTimeZone(ianaName).DynamicsCode
                        : 0;

                    TimeZoneCode.Set(context, timeZone);
                }
            }
            catch (Exception e)
            {
                var message = $"An exception occurred: {e.Message} ({e.GetType()})";
                Console.WriteLine(message);
                tracingService.Trace(message);
                throw e;
            }
        }
    }
}
