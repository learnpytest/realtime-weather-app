// import "./App.css";
import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { ThemeProvider, keyframes } from "@emotion/react";

import dayjs from "dayjs";

import { ReactComponent as DayCloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";

import { fetchCurrentWeather } from "./utils/fetchCurrentWeather";
import { fetchWeatherForecast } from "./utils/fetchWeatherForecast";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherCard = styled.div`
  box-shadow: 0 1px 3px 0 #999999;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;
  min-width: 360px;
  background-color: #f9f9f9;
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #212121;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const WeatherElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.span`
  color: #757575;
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 15px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
    animation: ${rotate} infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }
`;

// 深色主題配色
const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

function App() {
  console.log("invoke function component");
  const [currentTheme, setCurrentTheme] = useState("dark");

  // 根據畫面所需要的資料欄位與初始的資料
  const data = {
    locationName: "",
    description: "",
    temperature: 0,
    weatherCode: "",
    windSpeed: 0,
    rainPosibility: 0,
    observationTime: new Date(),
    comfortability: "",
    isLoading: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      setWeatherElement((prevState) => ({ ...prevState, isLoading: true }));
      const currentWeather = await fetchCurrentWeather();
      const weatherForecast = await fetchWeatherForecast();
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };
    fetchData();
    console.log("execute function in useEffect");
  }, []);

  // 使用useState定義資料狀態
  const [weatherElement, setWeatherElement] = useState(data);

  const {
    locationName,
    description,
    temperature,
    weatherCode,
    windSpeed,
    rainPosibility,
    observationTime,
    comfortability,
    isLoading,
  } = weatherElement;

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      {console.log("render")}
      <Container>
        <WeatherCard>
          <Location>{locationName}</Location>
          <Description>
            {description} {comfortability}
          </Description>
          <WeatherElement>
            <Temperature>
              {Math.round(temperature)}
              <Celsius>°C</Celsius>
            </Temperature>
            <DayCloudy />
          </WeatherElement>
          <AirFlow>
            <AirFlowIcon />
            {windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {rainPosibility}%
          </Rain>
          <Refresh
            onClick={() => {
              fetchCurrentWeather();
              fetchWeatherForecast();
            }}
            isLoading={isLoading}
          >
            最後觀測時間:{" "}
            {new Intl.DateTimeFormat("zh-TW", {
              hour: "numeric",
              minute: "numeric",
            }).format(dayjs(observationTime))}{" "}
            {isLoading ? <LoadingIcon /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
