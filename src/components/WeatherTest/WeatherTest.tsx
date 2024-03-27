import React, { useState, useEffect } from "react";

const WeatherInfo = () => {
  const [city, setCity] = useState("Pune");
  const [weatherData, setWeatherData] = useState(null);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=45bbe3a44805a6a51447e3b0f68fca89&cnt=36`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("Something Went Wrong: Try Checking Your Internet Connection");
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const renderWeatherInfo = () => {
    if (weatherData) {
      return (
        <>
          <div id="cityName">--{city}--</div>
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <div id={`day${index + 1}`}>{weekday[CheckDay(index)]}</div>
              {/* <img id={`img${index + 1}`} src={`http://openweathermap.org/img/wn/${weatherData.list[index].weather[0].icon}.png`} alt="weather-icon" /> */}
              {/* <div id={`day${index + 1}Min`}>Min: {Number(weatherData?.list[index].main.temp_min - 273.15).toFixed(1)}°</div>
              <div id={`day${index + 1}Max`}>Max: {Number(weatherData?.list[index].main.temp_max - 273.15).toFixed(2)}°</div> */}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  const CheckDay = (day: any) => {
    const d = new Date();
    if (day + d.getDay() > 6) {
      return day + d.getDay() - 7;
    } else {
      return day + d.getDay();
    }
  };

  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        id="cityInput"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      {renderWeatherInfo()}
    </div>
  );
};

export default WeatherInfo;
