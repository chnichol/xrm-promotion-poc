using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace TimeZoneWorkflow
{
    [DataContract]
    public class TimeZoneModel
    {
        [DataMember(Name = "authenticationResultCode")]
        public string AuthenticationResultCode { get; set; }

        [DataMember(Name = "brandLogoUri")]
        public Uri BrandLogoUri { get; set; }

        [DataMember(Name = "copyright")]
        public string Copyright { get; set; }

        [DataMember(Name = "resourceSets")]
        public ResourceSet[] ResourceSets { get; set; }

        [DataMember(Name = "statusCode")]
        public long? StatusCode { get; set; }

        [DataMember(Name = "statusDescription")]
        public string StatusDescription { get; set; }

        [DataMember(Name = "traceId")]
        public string TraceId { get; set; }
    }

    [DataContract(Name = "resourceSet")]
    public class ResourceSet
    {
        [DataMember(Name = "estimatedTotal")]
        public long? EstimatedTotal { get; set; }

        [DataMember(Name = "resources")]
        public Resource[] Resources { get; set; }
    }

    [DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1", Name = "RESTTimeZone")]
    public class Resource
    {
        [DataMember(Name = "__type")]
        public string Type { get; set; }

        [DataMember(Name = "timeZoneAtLocation")]
        public TimeZoneAtLocation[] TimeZoneAtLocation { get; set; }
    }

    [DataContract(Name = "timeZoneAtLocation")]
    public class TimeZoneAtLocation
    {
        [DataMember(Name = "placeName")]
        public string PlaceName { get; set; }

        [DataMember(Name = "timeZone")]
        public Timezone[] TimeZone { get; set; }
    }

    [DataContract(Name = "timeZone")]
    public class Timezone
    {
        [DataMember(Name = "genericName")]
        public string GenericName { get; set; }

        [DataMember(Name = "abbreviation")]
        public string Abbreviation { get; set; }

        [DataMember(Name = "ianaTimeZoneId")]
        public string IanaTimeZoneId { get; set; }

        [DataMember(Name = "windowsTimeZoneId")]
        public string WindowsTimeZoneId { get; set; }

        [DataMember(Name = "utcOffset")]
        public string UtcOffset { get; set; }

        [DataMember(Name = "convertedTime")]
        public ConvertedTime ConvertedTime { get; set; }
    }

    [DataContract(Name = "convertedTime")]
    public class ConvertedTime
    {
        [DataMember(Name = "utcOffsetWithDst")]
        public string UtcOffsetWithDst { get; set; }

        [DataMember(Name = "timeZoneDisplayName")]
        public string TimeZoneDisplayName { get; set; }

        [DataMember(Name = "timeZoneDisplayAbbr")]
        public string TimeZoneDisplayAbbr { get; set; }
    }
}
