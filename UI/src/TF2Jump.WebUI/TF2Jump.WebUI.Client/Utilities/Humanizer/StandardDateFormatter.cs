using System.Globalization;
using Humanizer;
using Humanizer.Configuration;
using Humanizer.DateTimeHumanizeStrategy;
using Humanizer.Localisation;
using Humanizer.Localisation.Formatters;

namespace TF2Jump.WebUI.Utilities.Humanizer;

public class StandardDateFormatter : IFormatter
{
    public static void Register()
    {
        Configurator.Formatters.Register(CultureInfo.CurrentUICulture.Name, new StandardDateFormatter());
    }
    
    public string DateHumanize_Now()
    {
        return "now";
    }

    public string DateHumanize_Never()
    {
        return "never";
    }

    public string DateHumanize(TimeUnit timeUnit, Tense timeUnitTense, int unit)
    {
        var tense = timeUnitTense == Tense.Future ? "from now" : "ago";
        return $"{unit} {timeUnit.ToString().ToLower()}{(unit > 1 ? "s" : "")} {tense}";
    }

    public string TimeSpanHumanize_Zero()
    {
        return "0 seconds";
    }

    public string TimeSpanHumanize(TimeUnit timeUnit, int unit, bool toWords = false)
    {
        return $"{unit} {timeUnit.ToString().ToLower()}{(unit > 1 ? "s" : "")}";
    }

    public string DataUnitHumanize(DataUnit dataUnit, double count, bool toSymbol = true)
    {
        throw new NotImplementedException();
    }

    public string TimeUnitHumanize(TimeUnit timeUnit)
    {
        return timeUnit.ToString().ToLower();
    }
}