// import "./App.css";
import { useState } from "react";

import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import dayjs from "dayjs";

import { ReactComponent as DayCloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";

const AUTHORIZATION_KEY = "CWB-31F2FF20-6F1C-46EA-A2F5-57B5DF78667C";
const LOCATION_NAME = "臺北";

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

const CurrentWeather = styled.div`
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

// fetch current weather data
const fetchingData = async () => {
  const result = await fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`
  );
  return result.json();
};

function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");

  // 根據畫面所需要的資料欄位與初始的資料
  const data = {
    locationName: "臺北市",
    description: "多雲時晴",
    temperature: 17.6,
    weatherIcon: "",
    windSpeed: 3.2,
    rainPosibility: 48.3,
    observationTime: "2022-01-09 18:40:00",
  };

  // 使用useState定義資料狀態
  const [currentWeather, setCurrentWeather] = useState(data);

  // 定義需要的事件
  const handleRefreshClicked = async () => {
    const result = await fetchingData();
    const locationData = result.records.location[0];
    const neededElements = locationData.weatherElement.reduce(
      (neededElements, item) => {
        if (["WDSD", "TEMP"].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
      },
      {}
    );
    setCurrentWeather({
      locationName: locationData.locationName,
      description: "多雲時晴",
      temperature: neededElements["TEMP"],
      weatherIcon: "",
      windSpeed: neededElements["WDSD"],
      rainPosibility: 48.3,
      observationTime: locationData.time.obsTime,
    });
  };

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard>
          <Location>{currentWeather.locationName}</Location>
          <Description>{currentWeather.description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(currentWeather.temperature)}
              <Celsius>°C</Celsius>
            </Temperature>
            <DayCloudy />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {currentWeather.windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {currentWeather.rainPosibility}%
          </Rain>
          <Refresh>
            最後觀測時間:{" "}
            {new Intl.DateTimeFormat("zh-TW", {
              hour: "numeric",
              minute: "numeric",
            }).format(dayjs(currentWeather.observationTime))}{" "}
            <RefreshIcon onClick={handleRefreshClicked} />
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
