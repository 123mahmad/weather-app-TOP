import { useEffect, useState } from "react";
import Current from "./components/Current";
import Hourly from "./components/Hourly";

function App() {

  let [city, setCity] = useState('Lahore');
  let [weather, setWeather] = useState({});
  let [filter, setFilter] = useState('');
  
  useEffect(()=>{
    initiate();
  },[])
  
  async function initiate() {
    console.log('WARNING: API INITIAL RUN');
    let response = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=31.582045&lon=74.329376&appid=bfe403be7fdc36230b9aeedb104c5f36", {mode: "cors"});
    let initialWeather = await response.json();
    setWeather(initialWeather);
    setCity('Lahore');
    setFilter('current');
  };

  async function handleSearch() {
    console.log('WARNING: API RUN');
    let cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=bfe403be7fdc36230b9aeedb104c5f36`, {mode: "cors"});
    let cityData = await cityResponse.json();
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&appid=bfe403be7fdc36230b9aeedb104c5f36`, {mode: "cors"});
    let weatherData = await weatherResponse.json();
    setWeather(weatherData);
  };

  function handleChange(e) {
    setCity(e.target.value);
  };

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  return (
    <div className="app">

      <label htmlFor="searchTerm">Enter City Name: </label>
      <input type="text" id="searchTerm" onChange={handleChange} value={city}/>
      <button onClick={handleSearch}>Search</button>

      <div>
        <p></p>
        <div>Latitude: {weather.lat}</div>
        <div>Longitude: {weather.lon}</div>
        <div>Timezone: {weather.timezone}</div>
        <div>Time: GMT+{weather.timezone_offset/3600}hr</div>
        <p></p>
      </div>

      <select id="filterBy" onClick={handleFilter} value={filter} >
        <option value='current'>Current</option>
        <option value='hourly'>Hourly</option>
      </select>

      {filter === 'current' && <Current weather={weather}></Current>}
      
      {filter === 'hourly' && <Hourly weather={weather}></Hourly>}

    </div>
  );
};

export default App;
