import { useEffect, useState } from "react";

function Hourly(props) {

  let [filter, setFilter] = useState('');
  let [hourlyWeather, setHourlyWeather] = useState('str');
  
  useEffect(()=>{
    async function getData() {
      let data = await props;
      let hourly = await data.weather.hourly;
      setHourlyWeather(hourly);
      setFilter(props.filter);
    };
    getData();
  }, [props]);

  function time() {
    let d = new Date();
    let time = d.getTime();
    return time;
  };

  if (filter === 'hourly' && hourlyWeather !== undefined) {
    let returnArray = hourlyWeather.map((item, index) => {
      return(
        <div key={index}>
          <p>Time: {time()}</p>
          <div>Temp: {(item.temp-273.15).toPrecision(4)} °C</div>
          <div>Feels Like: {(item.feels_like-273.15).toPrecision(4)} °C</div>
          <p></p>
        </div>
      );
    })
    return <div>{returnArray}</div>;
  };

  return <div></div>;
};

export default Hourly;
