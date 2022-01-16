import sunriseAndSunsetData from "./sunrise-sunset.json";

export const getMoment = (locationName) => {
  const locationData = sunriseAndSunsetData.find(item => item.locationName === locationName)
  if (!locationData) throw new Error(`找不到 ${locationName} 的日出日落資料`)

  const now = new Date()

  const nowTime = new Intl.DateTimeFormat('zh-TW', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now).replace(/\//g, "-")

  const selectLocationDataByNow = locationData.time.find(time => time.dataTime === nowTime)

  if (!selectLocationDataByNow) throw new Error(`找不到 ${selectLocationDataByNow} 的日出日落資料`)

  const sunriseTimeStamp = new Date(`${selectLocationDataByNow.dataTime} ${selectLocationDataByNow.sunrise}`).getTime()
  const sunsetTimeStamp = new Date(`${selectLocationDataByNow.dataTime} ${selectLocationDataByNow.sunset}`).getTime()
  const nowTimeStamp = now.getTime()

  return sunriseTimeStamp <= nowTimeStamp && nowTimeStamp <= sunsetTimeStamp ? "day" : "night"
};