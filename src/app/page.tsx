"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getCurrentWeatherData,
  getHourlyWeatherData,
} from "../services/openWeather";

import { fetchPhotos } from "../services/Unsplash";
import Weather from "@/components/weather/weather";
import WeatherInfo from "@/components/WeatherTest/WeatherTest";

export default function Home() {
  const [photos, setPhotos] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      // const weatherReport = await getHourlyWeatherData(18.5204, 73.856);
      const imgs = await fetchPhotos();
      console.log("getHourlyWeatherData : ", imgs);
    };
    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Weather />
    </main>
  );
}
