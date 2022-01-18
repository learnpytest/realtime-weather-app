// helpers
import { getMoment } from "./utils/helpers";
import useWeatherAPI from "./hooks/useWeatherAPI";
import {
  LOCATION_NAME_FORECAST,
  LOCATION_NAME_CURRENT,
  AUTHORIZATION_KEY,
} from "./utils/config";

import { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

// pages
import WeatherCard from "./views/WeatherCard";
import WeatherSetting from "./views/WeatherSetting";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  // 使用useState定義資料狀態
  const [weatherElement, fetchData] = useWeatherAPI({
    locationName: LOCATION_NAME_CURRENT,
    cityName: LOCATION_NAME_FORECAST,
    authorizationKey: AUTHORIZATION_KEY,
  });
  const [currentTheme, setCurrentTheme] = useState("light");

  // 定義使用者看到哪一個頁面
  const [currentPage, setCurrentPage] = useState("WeatherCard");

  // 定義事件
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  // 取得使用者地區的時間是白天還是晚上
  const moment = useMemo(
    () => getMoment(LOCATION_NAME_FORECAST),
    [LOCATION_NAME_FORECAST]
  );

  // 定義事件
  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      {console.log("render")}
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting handleCurrentPageChange={handleCurrentPageChange} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
