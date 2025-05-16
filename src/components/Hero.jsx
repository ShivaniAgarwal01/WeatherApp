import React from 'react'
import { useEffect ,useState ,useRef} from 'react';
// import searchIcon from './assets/searchIcon.png';

function Hero({setIsDayTime}) {
    const [weather , setWeather] = useState(false);
    const inputRef= useRef() ;
    
    const search = async(city) =>{
        if(city === "")
        {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const urlIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            const utcTime = new Date().getTime();
            const localTime = new Date(utcTime + data.timezone * 1000); 
            const hours = localTime.getUTCHours(); 

            const isDayTime = hours >= 6 && hours < 18;
            console.log(hours)
            setIsDayTime(isDayTime);
            setWeather({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                location: data.name,
                description : data.weather[0].description,
                temperature :Math.floor(data.main.temp),
                temp_high:Math.floor(data.main.temp_max),
                temp_low:Math.floor( data.main.temp_min),
                icon : urlIcon,
                localTime: localTime.toLocaleTimeString(),
                isDayTime,
            })
        } catch (error) {
            setWeather(false);
            console.log("Error in fetching weather data");
        }
    }
    useEffect(() =>{
        search("london")
    },[])

  return (
    <div className='hero-container bg-none'>
        <div className='flex flex-row justify-center items-center mt-2'>
        <input 
        type="text" 
        placeholder='Enter the Place...'
        className='w-150 h-10 bg-white ml-10 p-6 rounded-l-2xl shadow-md border-none'
        ref={inputRef}
        />
        <button className=' bg-white h-12 w-13 rounded-r-2xl shadow-md border-none flex justify-center items-center' onClick={() => search(inputRef.current.value)}>
            <img src="searchIcon.png" alt="searchIcon" className='h-5 w-5'/>
        </button>
        </div>
       {weather? <>
       <div className='content-container flex flex-col justify-center items-center mt-5 text-white text-center'>
            <img src={weather.icon} alt="icon" className='h-40 w-40 '/>
            <p className='location text-[35px] leading-none mt-0 mb-0'>{weather.location}</p>
            <p className='temperature text-[65px] leading-none mt-2 mb-0'>{weather.temperature}°C</p>
            <p className='description text-[25px] leading-none mt-1.5 mb-1'>{weather.description}</p>
       </div>
        <div className='high-low flex flex-row justify-center items-center gap-10'>
            <div className='high text-[20px] text-white'>H:{weather.temp_high}°C</div>
            <div className='low text-[20px] text-white'>L:{weather.temp_low}°C</div>
        </div>
        <div className='flex flex-row justify-center items-center gap-20 mt-10'>
            <div className='flex flex-row justify-center items-center'>
                <img src="humidityIcon.png" alt="humidIcon" className='h-15 w-15'/>
                <div className='flex flex-col  ml-2'>
                    <div className='humidity text-[20px] text-white'>{weather.humidity} %</div>
                    <p className='text-[18px] text-white'>Humidity</p>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <img src="windSpeed.png" alt="windSpeedIcon" className='h-15 w-15'/>
                <div className='flex flex-col  ml-2'>
                    <div className='windSpeed text-[20px] text-white'>{weather.windSpeed} km/h</div>
                    <p className='text-[18px] text-white'>Wind Speed</p>
                </div>
            </div>
            </div>
         </>:<></>}
    </div>
  )
}

export default Hero