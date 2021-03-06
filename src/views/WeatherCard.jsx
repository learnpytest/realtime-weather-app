import React from "react";

import { keyframes } from "@emotion/react";

// 套件
import styled from "@emotion/styled";
import dayjs from "dayjs";

// 圖示
import WeatherIcon from "../components/WeatherIcon";

import { ReactComponent as AirFlowIcon } from "../images/airFlow.svg";
import { ReactComponent as RainIcon } from "../images/rain.svg";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";
import { ReactComponent as LoadingIcon } from "../images/loading.svg";
import { ReactComponent as CogIcon } from "../images/cog.svg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const WeatherCardWrapper = styled.div`
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

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
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

function WeatherCard({
  weatherElement,
  cityName,
  moment,
  fetchData,
  handleCurrentPageChange,
}) {
  const {
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
    <WeatherCardWrapper>
      <Cog onClick={() => handleCurrentPageChange("WeatherSetting")} />
      <Location>{cityName}</Location>
      <Description>
        {description} {comfortability}
      </Description>
      <WeatherElement>
        <Temperature>
          {Math.round(temperature)}
          <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={moment} />
      </WeatherElement>
      <AirFlow>
        <AirFlowIcon />
        {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {rainPosibility}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
        最後觀測時間:{" "}
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric",
        }).format(dayjs(observationTime))}{" "}
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrapper>
  );
}

export default WeatherCard;
