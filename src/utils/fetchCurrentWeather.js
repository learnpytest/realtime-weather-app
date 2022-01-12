  import {
    AUTHORIZATION_KEY,
    LOCATION_NAME_CURRENT
  } from "./config"

  const fetchingCurrentWeather = async () => {
    const result = await fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_CURRENT}`
    );
    return result.json();
  };

  export const fetchCurrentWeather = async () => {
    const result = await fetchingCurrentWeather();
    const currentLocationData = result.records.location[0];
    const neededElements = currentLocationData.weatherElement.reduce(
      (neededElements, item) => {
        if (["WDSD", "TEMP"].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
      }, {}
    );

    return {
      locationName: currentLocationData.locationName,
      temperature: neededElements["TEMP"],
      windSpeed: neededElements["WDSD"],
      observationTime: currentLocationData.time.obsTime,
    };
  };