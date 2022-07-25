import { useState } from "react";

function Hourly(props) {

  let [hourlyWeather] = useState(props.weather.hourly);

  function time() {
    let d = new Date();
    let time = d.toLocaleTimeString();
    return time;
  };

  let returnArray = hourlyWeather.map((item, index) => {
    return(
      <div key={index}>
        <br></br>
        <p>Time: {time()}</p>
        <div>Temp: {(item.temp-273.15).toPrecision(4)} °C</div>
        <div>Feels Like: {(item.feels_like-273.15).toPrecision(4)} °C</div>
        <p></p>
      </div>
    );
  })
  return <div>{returnArray}</div>;

};

export default Hourly;
