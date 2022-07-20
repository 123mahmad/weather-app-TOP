import { useState } from "react";
import Current from "./components/Current";
import Hourly from "./components/Hourly";

let initialValue = async function initiate() {
  console.log('WARNING: API3.0 INITIAL RUN');
  let response = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=31.582045&lon=74.329376&appid=bfe403be7fdc36230b9aeedb104c5f36", {mode: "cors"});
  let initialWeather = await response.json();
  return initialWeather;
};

function App() {

  let [city, setCity] = useState('Lahore');
  let [weather, setWeather] = useState(initialValue);
  let [filter, setFilter] = useState('');
  
  async function handleSearch() {
    let cityCoords = await getCityCoords(city);
    let weatherData = await getWeatherInfo(cityCoords.lat,cityCoords.lon);
    setWeather(weatherData);
  };
  async function getCityCoords(city) {
    console.log('WARNING: API2.5 RUN');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=bfe403be7fdc36230b9aeedb104c5f36`, {mode: "cors"});
    let cityData = await response.json();
    return cityData.coord;
  };
  async function getWeatherInfo(lat,lon) {
    console.log('WARNING: API3.0 RUN');
    let response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=bfe403be7fdc36230b9aeedb104c5f36`, {mode: "cors"});
    let weatherData = await response.json();
    return weatherData;
  };
  function handleChange(e) {
    setCity(e.target.value);
  };
  function handleTest() {
    console.log(filter,weather);
  };
  function handleFilter(e) {
    setFilter(e.target.value);
  }

  return (
    <div className="app">
      <label htmlFor="searchTerm">Enter City Name: </label>
      <input type="text" id="searchTerm" onChange={handleChange} value={city}/>
      <span> </span>
      <button onClick={handleSearch}>Search</button>
      <p></p>
      <button onClick={handleTest}>Console.log(weatherData)</button>
      <div>
        <p></p>
        <div>Latitude: {weather.lat}</div>
        <div>Longitude: {weather.lon}</div>
        <div>Timezone: {weather.timezone}</div>
        <div>Time: GMT+{weather.timezone_offset/3600}hr</div>
        <p></p>
      </div>
      <select id="filterBy" onClick={handleFilter}>
        <option value=''>Select Filter</option>
        <option value='current'>Current</option>
        <option value='hourly'>Hourly</option>
      </select>
      <Current filter={filter} weather={weather}></Current>
      <Hourly filter={filter} weather={weather}></Hourly>
    </div>
  );
};

export default App;
