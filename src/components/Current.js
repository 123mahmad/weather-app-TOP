import { useState } from "react";

function Current(props) {
  
  let [currentWeather] = useState(props.weather.current);
  
  return(
    <div>
      <p>Now: </p>
      <div>Temp: {(currentWeather.temp-273.15).toPrecision(4)} °C</div>
      <div>Feels Like: {(currentWeather.feels_like-273.15).toPrecision(4)} °C</div>
    </div>
  );
  
};

export default Current;
