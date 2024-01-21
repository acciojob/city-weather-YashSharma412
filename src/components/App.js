
import React from "react";
import './../styles/App.css';
import WeatherData from "./WeatherData";

const App = () => {
  return (
    <div className="App">
        {/* Do not remove the main div */}
        <WeatherData />
    </div>
  )
}

export default App;
