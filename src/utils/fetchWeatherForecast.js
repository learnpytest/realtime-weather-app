  import {
    AUTHORIZATION_KEY,
    LOCATION_NAME_FORECAST
  } from "./config"

  const fetchingForecastWeather = async () => {
    const result = await fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
    );

    return result.json();
  };

  export const fetchWeatherForecast = async () => {
    const responseOfWeatherForecast = await fetchingForecastWeather();
    const forecastLocationData = responseOfWeatherForecast.records.location[0];
    const neededForecastElements = forecastLocationData.weatherElement.reduce(
      (neededElements, item) => {
        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter;
        }
        return neededElements;
      }, {}
    );

    return {
      description: neededForecastElements["Wx"].parameterName,
      weatherCode: neededForecastElements["Wx"].parameterValue,
      rainPosibility: neededForecastElements["PoP"].parameterName,
      comfortability: neededForecastElements["CI"].parameterName,
    };

  };