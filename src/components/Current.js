import { useEffect, useState } from "react";

function Current(props) {
  
  let [filter, setFilter] = useState('');
  let [currentWeather, setCurrentWeather] = useState({cloud:'',temp:'',feels_like:'',humidity:''});
  
  useEffect(()=>{
    async function getData() {
      let data = await props;
      let current = await data.weather.current;
      setCurrentWeather(current);
      setFilter(props.filter);
    };
    getData();
  }, [props])

  if (filter === 'current') {return(
    <div>
      <p>Now: </p>
      <div>Temp: {(currentWeather.temp-273.15).toPrecision(4)} °C</div>
      <div>Feels Like: {(currentWeather.feels_like-273.15).toPrecision(4)} °C</div>
    </div>
  )};
  
  return <div></div>

};

export default Current;
