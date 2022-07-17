import { useState } from "react";

let App = () => {
  let [city, setCity] = useState('');
  let [weather, setWeather] = useState({});
  function handleChange(e) {
    setCity(e.target.value);
  };
  async function handleSearch() {
    let cityCoords = await getCityCoords(city);
    let weatherData = await getWeatherInfo(cityCoords.lat,cityCoords.lon);
    setWeather(weatherData);
  };
  async function getCityCoords(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3c700a47cde0b8070ae0f2ae13ad80ec`, {mode: "cors"});
    let cityData = await response.json();
    return cityData.coord;
  };
  async function getWeatherInfo(lat,lon) {
    let response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=3c700a47cde0b8070ae0f2ae13ad80ec`, {mode: "cors"});
    let weatherData = await response.json();
    return weatherData;
  };
  function handleTest(){
    console.log(weather);
  }
  return (
    <div className="App">
      <label htmlFor="searchTerm">Enter City Name: </label>
      <input type="text" id="searchTerm" onChange={handleChange} value={city}/>
      <span> </span>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleTest}>Console.log(weatherData)</button>
    </div>
  );
}

export default App;
