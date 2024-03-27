// import { fetchWeatherApi } from "openmeteo";

const apiKey = "45bbe3a44805a6a51447e3b0f68fca89";
const openWetherBaseUrl = "https://api.openweathermap.org";
const currentForecastUrl = `${openWetherBaseUrl}/data/2.5/forecast?lat=lat__&lon=lon__&appid=${apiKey}&cnt=36`;
const hourlyForecastUrl = `${openWetherBaseUrl}/data/3.0/onecall?lat=lat__&lon=lon__&exclude=hourly&appid=${apiKey}`;

const handleUrls = (url: string, lat: any, lon: any) => {
  return url.replace("lat__", lat).replace("lon__", lon);
};
// 7893982225
export const getCurrentWeatherData = async (lat: number, lon: number) => {
  const urlResult = handleUrls(currentForecastUrl, lat, lon);
  console.log("urlResult : ", urlResult);
  const resp = await fetch(urlResult);
  return await resp.json();
  //   return {
  //     coord: {
  //       lon: 73.856,
  //       lat: 18.5204,
  //     },
  //     weather: [
  //       {
  //         id: 800,
  //         main: "Clear",
  //         description: "clear sky",
  //         icon: "01d",
  //       },
  //     ],
  //     base: "stations",
  //     main: {
  //       temp: 307.14,
  //       feels_like: 304.8,
  //       temp_min: 307.14,
  //       temp_max: 307.14,
  //       pressure: 1010,
  //       humidity: 16,
  //       sea_level: 1010,
  //       grnd_level: 950,
  //     },
  //     visibility: 10000,
  //     wind: {
  //       speed: 2.05,
  //       deg: 66,
  //       gust: 1.83,
  //     },
  //     clouds: {
  //       all: 1,
  //     },
  //     dt: 1711092158,
  //     sys: {
  //       country: "IN",
  //       sunrise: 1711069614,
  //       sunset: 1711113351,
  //     },
  //     timezone: 19800,
  //     id: 1259229,
  //     name: "Pune",
  //     cod: 200,
  //   };
};

export const getHourlyWeatherData = async (lat: number, lon: number) => {
  const resp = await fetch(
    `${hourlyForecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return await resp.json();
};

// export const getOpenmeteoForecast = async () => {
//   const params = {
//     latitude: 52.52,
//     longitude: 13.41,
//     hourly: "temperature_2m",
//   };
//   const url = "https://api.open-meteo.com/v1/forecast";
//   const responses = await fetchWeatherApi(url, params);
//   // Helper function to form time ranges
//   const range = (start: number, stop: number, step: number) =>
//     Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
//   // Process first location. Add a for-loop for multiple locations or weather models
//   const response = responses[0];
//   // Attributes for timezone and location
//   const utcOffsetSeconds = response.utcOffsetSeconds();
//   const timezone = response.timezone();
//   const timezoneAbbreviation = response.timezoneAbbreviation();
//   const latitude = response.latitude();
//   const longitude = response.longitude();
//   const hourly = response.hourly()!;
//   // Note: The order of weather variables in the URL query and the indices below need to match!
//   const weatherData = {
//     hourly: {
//       time: range(
//         Number(hourly.time()),
//         Number(hourly.timeEnd()),
//         hourly.interval()
//       ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
//       temperature2m: hourly.variables(0)!.valuesArray()!,
//     },
//   };
//   // `weatherData` now contains a simple structure with arrays for datetime and weather data
//   for (let i = 0; i < weatherData.hourly.time.length; i++) {
//     console.log(
//       "getOpenmeteoForecast",
//       weatherData.hourly.time[i].toISOString(),
//       weatherData.hourly.temperature2m[i]
//     );
//   }
// };
