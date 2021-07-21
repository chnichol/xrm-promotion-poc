using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Runtime.Serialization.Json;
using System.Web;

namespace GetTimeZone
{
    public class BingMapsClient
    {
        private readonly string _apiKey;
        private readonly string _apiRoot = "https://dev.virtualearth.net/REST/v1";
        private readonly HttpClient _httpClient;

        public BingMapsClient(HttpClient client, string key)
        {
            _httpClient = client;
            _apiKey = key;
        }

        public async Task<TimeZoneResponse> QueryTimeZone(Address address)
        {
            var uri = new UriBuilder($"{_apiRoot}/TimeZone");
            var query = HttpUtility.ParseQueryString(uri.Query);
            query["key"] = _apiKey;
            query["query"] = string.Join(" ", (new string[] { address.Street, address.City, address.State, address.Zip }).Where(s => !string.IsNullOrEmpty(s)));
            uri.Query = query.ToString();

            var responseString = await _httpClient.GetStringAsync(uri.Uri);
            var responseObject = await ParseResponse(responseString);
            return responseObject;
        }

        private async Task<TimeZoneResponse> ParseResponse(string response) 
        {
            using (var stream = new MemoryStream())
            {
                // Load the response string into the memory stream.
                var writer = new StreamWriter(stream);
                await writer.WriteAsync(response);
                await writer.FlushAsync();

                // Reset the stream position.
                stream.Position = 0;

                // Deserialize the response string.
                var serializer = new DataContractJsonSerializer(typeof(TimeZoneResponse));
                var timeZoneResponse = serializer.ReadObject(stream) as TimeZoneResponse;

                // Close/dispose of the writer.
                // We need to do this after deserializing, otherwise the stream would be disposed by the writer and be unreadable.
                writer.Close();
                writer.Dispose();

                return timeZoneResponse;
            }
        }
    }
}