const API_KEY = "KYRGFRZQFVW7YDC8R5FGMWWZZ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const METRIC_UNIT = "unitGroup=metric";
const ELEMENTS =
  "&elements=conditions,datetime,feelslike,humidity,icon,name,offset,precip,sunrise,sunriseEpoch,sunset,sunsetEpoch,temp,tempmax,tempmin,uvindex,windspeed";
const PERIOD = "include=days,current";

export async function getWeatherForLocation(location) {
  try {
    const response = await fetch(
      `${BASE_URL}${location}?${METRIC_UNIT}&${ELEMENTS}&${PERIOD}&key=${API_KEY}`,
    );
    const weatherData = await response.json();
    const locationName = weatherData.resolvedAddress;

    const currentForecastData = getCurrentForecastData(weatherData);
    const weekForecastData = getWeekForecastData(weatherData);

    const currentForecast = getCurrentForecast(currentForecastData);
    const weekForecast = getWeekForecast(weekForecastData);
    const sunBehaviour = getSunBehavior(currentForecastData);

    return { currentForecast, sunBehaviour, weekForecast, locationName };
  } catch (error) {
    console.log(error);
    return error;
  }
}

function getCurrentForecastData(forecastData) {
  return forecastData.currentConditions;
}

function getWeekForecastData(forecastData) {
  return forecastData.days.slice(0, 7);
}

function getCurrentForecast(currentForecastData) {
  return {
    tempreture: currentForecastData.temp,
    location: currentForecastData.name,
    feelsLike: currentForecastData.feelslike,
    conditions: currentForecastData.conditions,
    windSpeed: currentForecastData.windspeed,
    uvIndex: currentForecastData.uvindex,
  };
}

function getSunBehavior(dayForecastData) {
  return {
    sunrise: dayForecastData.sunrise,
    sunset: dayForecastData.sunset,
  };
}

function getWeekForecast(weekForecastData) {
  const weekForecast = [];
  weekForecastData.forEach((day) => {
    weekForecast.push({
      conditions: day.conditions,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      dateTime: day.datetime,
    });
  });

  return weekForecast;
}
