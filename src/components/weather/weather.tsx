import React, { useEffect, useState } from "react";
import { IoIosCloudy } from "../../services/weatherIcons";
import style from "@/app/weatherstyle.module.css";
import { Button } from "../ui/button";
import {
  getCurrentWeatherData,
  // getOpenmeteoForecast,
} from "@/services/openWeather";
import moment from "moment";
import { FiCloudRain } from "react-icons/fi";
import { FaWind } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { IoRainy } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";

// const timeSlots = [
//   "6:00 AM",
//   "9:00 AM",
//   "12:00 PM",
//   "3:00 PM",
//   "6:00 PM",
//   "9:00 PM",
// ];
const airConditions = ["Real Feel", "Wind", "Chance of rain", "UV Index"];

const Weather = () => {
  // Define weather data for the next few days
  const [geoLoc, setGeoLoc] = useState({ lat: 0, lon: 0 });
  const [data, setData] = useState<any>();
  const [uniqueDate, setUniqueDate] = useState<any>();
  const [cityName, setCityName] = useState<any>();
  const [oneData, setOneData] = useState<any>();
  const [oneWeather, setOneWeather] = useState<any>();
  // const oneData = data[0];
  const days = [
    { day: "Thu", temperature: "37° / 21°", condition: "Cloudy" },
    { day: "Fri", temperature: "37° / 21°", condition: "Cloudy" },
    { day: "Sat", temperature: "37° / 21°", condition: "Rainy" },
    { day: "Sun", temperature: "4° / 37°", condition: "Storm" },
    { day: "mon", temperature: "4° / 37°", condition: "Storm" },
    { day: "tue", temperature: "4° / 37°", condition: "Storm" },
    { day: "wed", temperature: "4° / 37°", condition: "Storm" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            setGeoLoc({ ...geoLoc, lat: latitude, lon: longitude });
            // You can use the latitude and longitude values here as needed
          },
          function (error) {
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getCurrentWeatherData(geoLoc.lat, geoLoc.lon);
      setData(resp?.list);
      setCityName(resp?.city?.name);
      setOneData(resp?.list[0]);
      setOneWeather(resp?.list[0]?.weather[0]?.main);
      const filterUniqueDataByFirstName = (data: any) => {
        const uniqueFirstNames: object | string | any = {};
        return data?.filter((item: any) => {
          const dt = item.dt_txt.split(" ")[0];
          if (!uniqueFirstNames[dt]) {
            uniqueFirstNames[dt] = true;
            return true;
          }
          return false;
        });
      };
      // const uniqueData = filterUniqueDataByFirstName(resp?.list);
      setUniqueDate(filterUniqueDataByFirstName(resp?.list));
    };
    fetchData();
  }, [geoLoc.lat, geoLoc.lon]);
  console.log("oneData : ", oneData);

  return (
    <div
      className={`flex flex-col bg-gray-200 p-8 rounded-lg w-full ${style.bgColor}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-full">
          <h5 className="text-sm font-semibold">Weather</h5>
        </div>
        {/* Consider adding Map button */}
      </div>
      <div className="mt-7 flex flex-row justify-between w-full">
        {/* card1 */}
        <div
          className={`w-full lg:w-2/3 xl:w-3/4 mb-8 lg:mb-0 ${style.textColor}`}
        >
          {/* c1b1 */}
          <div className="flex items-center bottom-4 h-32 mt-3 m-5 ml-10">
            <div className="flex flex-grow">
              <div className="flex flex-col justify-between">
                <div className="font-semibold text-3xl mb-7">{cityName}</div>
                <div className="font-semibold text-3xl text-white">25°C</div>
              </div>
            </div>
            <div className="font-semibold text-5xl ml-4">
              {/* //oneWeather
            
              <IoIosCloudy /> */}
              {oneWeather === "Clear" ? (
                <LuSun className={`text-4xl ${style.textColor}`} />
              ) : oneWeather === "Clouds" ? (
                <IoIosCloudy className={`text-4xl ${style.textColor}`} />
              ) : oneWeather === "Rain" ? (
                <IoRainy className={`text-4xl ${style.textColor}`} />
              ) : oneWeather === "Sunny" ? (
                <IoMdSunny className={`text-4xl ${style.textColor}`} />
              ) : (
                ""
              )}
            </div>
          </div>

          {/* c1b2 */}
          <div className={style.bgCardColor}>
            <div className="m-3">TODAYS FORECAST</div>
            <div className="flex flex-col items-center">
              <div className="text-center w-full ">
                <div className="flex flex-row justify-even w-full ">
                  {/* Mapping time slots */}
                  {data?.slice(0, 6)?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`flex flex-col w-full text-center items-center p-2 ${
                        index !== item.length - 1
                          ? "border-r border-white-800"
                          : ""
                      } ${style.textColor}`}
                    >
                      <div>{moment(item?.dt_txt).format("hh:mm A")}</div>
                      <div>
                        <IoIosCloudy className="text-5xl" />
                      </div>

                      <div className="text-white">
                        {Math.round(item?.main?.temp - 273)}
                        <sup>o</sup>C
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* c1b3 */}
          <div className={style.bgCardColor}>
            <div className="flex justify-between m-3">
              <div>AIR CONDITIONS</div>

              <Button>See More</Button>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                {/* Mapping air condition slots */}
                {airConditions.map((airCondition, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center  p-4 ${style.textColor}`}
                  >
                    <div className="flex items-center mb-2 mr-5 gap-3">
                      {airCondition === "Chance of rain" ? (
                        <FiCloudRain style={{ fontSize: "25px" }} />
                      ) : airCondition == "Wind" ? (
                        <FaWind />
                      ) : airCondition === "Real Feel" ? (
                        <FaThermometerHalf style={{ fontSize: "25px" }} />
                      ) : airCondition === "UV Index" ? (
                        <FaSun />
                      ) : (
                        ""
                      )}
                      {/* <IoIosCloudy className="text-5xl mr-2" /> */}
                      {airCondition}
                      <div></div>
                    </div>
                    <div className="text-center text-white">
                      {" "}
                      {airCondition === "Real Feel" ? (
                        <span>
                          {Math.round(oneData?.main?.feels_like - 273)}
                          <sup>o</sup>C
                        </span>
                      ) : airCondition === "Wind" ? (
                        <span>
                          {Math.round(oneData?.wind?.speed) + " Km/h"}
                        </span>
                      ) : airCondition === "Chance of rain" ? (
                        oneData?.wind?.speed
                      ) : airCondition === "UV Index" ? (
                        oneData?.wind?.speed
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* card2 */}
        <div
          className={`w-full lg:w-1/3 xl:w-1/4 ml-4 lg:ml-8 flex flex-col justify-evenly ${style.bgCardColor}`}
        >
          {/* Render weather forecast for each day */}
          {/* {days.map((day, index) => ( */}

          {uniqueDate?.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-center mt-4  pb-4 ${
                index !== days.length - 1 ? "border-b border-white-800" : ""
              } `}
            >
              <div className="w-1/3 lg:w-1/4 xl:w-1/5">
                <p className={style.textColor}>
                  {moment(item?.dt_txt).format("ddd A")}
                </p>
              </div>
              <div className="w-1/3 lg:w-1/2 ml-4 mr-4 flex items-center">
                <div className="w-2/3 text-center">
                  {item?.weather[0]?.main === "Clear" ? (
                    <LuSun className={`text-4xl ${style.textColor}`} />
                  ) : item?.weather[0]?.main === "Clouds" ? (
                    <IoIosCloudy className={`text-4xl ${style.textColor}`} />
                  ) : item?.weather[0]?.main === "Rain" ? (
                    <IoRainy className={`text-4xl ${style.textColor}`} />
                  ) : item?.weather[0]?.main === "Sunny" ? (
                    <IoMdSunny className={`text-4xl ${style.textColor}`} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-2/3 ">
                  <p className="text-white p-2"> {item?.weather[0]?.main}</p>
                  {console.log(item?.weather[0]?.main, "mainData") as any}
                </div>
              </div>
              <div className="w-1/3 lg:w-2/3 xl:w-1/5">
                <p className={`text-xl font-semibold ${style.textColor}`}>
                  {Math.round(item?.main?.temp_max - 273)} /{" "}
                  {Math.round(item?.main?.temp_min - 273)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
