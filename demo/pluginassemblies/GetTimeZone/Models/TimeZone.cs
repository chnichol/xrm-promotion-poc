using System.Collections.Generic;

namespace GetTimeZone
{
    public struct TimeZone
    {
        public int DynamicsCode;

        public string IANAName;

        public TimeZone(int dynamicsCode, string ianaName)
        {
            DynamicsCode = dynamicsCode;
            IANAName = ianaName;
        }
    }

    // This really would be better using the SmartEnum library,
    // but external libraries are not easy in workflows.
    public static class TimeZoneMap
    {
        private static readonly IDictionary<int, TimeZone> _dynamicsLookup = new Dictionary<int, TimeZone>();
        private static readonly IDictionary<string, TimeZone> _ianaLookup = new Dictionary<string, TimeZone>();
        private static readonly IEnumerable<TimeZone> _timeZones = new List<TimeZone>
        {
            new TimeZone(4, "America/Los_Angeles"),
            new TimeZone(20, "America/Chicago")
        };

        static TimeZoneMap()
        {
            foreach(var timeZone in _timeZones)
            {
                _dynamicsLookup.Add(timeZone.DynamicsCode, timeZone);
                _ianaLookup.Add(timeZone.IANAName, timeZone);
            }
        }

        public static bool Contains(int dynamicsCode) => _dynamicsLookup.ContainsKey(dynamicsCode);
        public static bool Contains(string ianaName) => _ianaLookup.ContainsKey(ianaName);
        public static TimeZone GetTimeZone(int dynamicsCode) => _dynamicsLookup[dynamicsCode];
        public static TimeZone GetTimeZone(string ianaName) => _ianaLookup[ianaName];
    }
}