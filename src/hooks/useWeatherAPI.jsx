import { fetchCurrentWeather } from "../utils/fetchCurrentWeather";
import { fetchWeatherForecast } from "../utils/fetchWeatherForecast";

import { useState, useEffect, useCallback } from "react";

// 根據畫面所需要的資料欄位與初始的資料
const data = {
  locationName: "",
  description: "",
  temperature: 0,
  weatherCode: 0,
  windSpeed: 0,
  rainPosibility: 0,
  observationTime: new Date(),
  comfortability: "",
  isLoading: true,
};

const useWeatherAPi = ({ locationName, cityName, authorizationKey }) => {
  const [weatherElement, setWeatherElement] = useState(data);
  const fetchData = useCallback(async () => {
    setWeatherElement((prevState) => ({ ...prevState, isLoading: true }));
    const currentWeather = await fetchCurrentWeather({
      authorizationKey,
      locationName,
    });
    const weatherForecast = await fetchWeatherForecast({
      authorizationKey,
      cityName,
    });
    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    });
  }, [authorizationKey, locationName, cityName]); // setWeatherElement 用 function 的方式回傳新的 weatherElement 的值

  useEffect(() => {
    console.log("execute function in useEffect");
    fetchData();
  }, [fetchData]);
  return [weatherElement, fetchData];
};

export default useWeatherAPi;
