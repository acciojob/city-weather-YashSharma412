import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
function WeatherData() {
  const dispFlexCol = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  };
  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (weatherData) console.log("Weather Data:", weatherData);
  }, [weatherData]);

  async function fetchWeatherData(e) {
    await e.preventDefault();
    try {
      const response = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: "26bc340b6bdbde27408394b656acaf25",
            units: "imperial",
          },
        }
      );
      setWeatherData(response.data);
      setCity("");
      setMsg("");
    } catch (err) {
      setMsg(err.response.data.message);
    }
  }
  return (
    <div className="weather" style={dispFlexCol}>
      <h1>Weather Data</h1>
      <form
        onSubmit={(e) => {
          fetchWeatherData(e);
        }}
      >
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
        <input
          type="text"
          placeholder="Enter a city"
          style={{ width: "100%" }}
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </form>
      {weatherData !== "" && (
        <div style={dispFlexCol}>
          <h3>{weatherData.name}</h3>
          <h1>{weatherData.main.temp} &deg;F</h1>
          <p>{weatherData.weather[0].description}</p>
          <img
            id={`weather-icon-${weatherData.weather[0].icon}`}
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          ></img>
        </div>
      )}
      {weatherData === "" && msg !== "" && <div>{msg}</div>}
    </div>
  );
}

export default WeatherData;
