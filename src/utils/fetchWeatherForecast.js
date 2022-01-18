  const fetchingForecastWeather = async ({
    authorizationKey,
    cityName
  }) => {
    const result = await fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
    );

    return result.json();
  };

  export const fetchWeatherForecast = async ({
    authorizationKey,
    cityName
  }) => {
    const responseOfWeatherForecast = await fetchingForecastWeather({
      authorizationKey,
      cityName
    });
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