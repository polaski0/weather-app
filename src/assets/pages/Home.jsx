import React, { useEffect, useState, useRef } from 'react';
import { Foreground, MidgroundFar, MidgroundNear, MountainBackground } from '../images/Background';
import '../svg.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DATA = {

  dawn: {
    background: {
      from: '#1A6C95',
      via: '#ABB6A2',
      to: '#CA8C63'
    },
    mountain: {
      base: '#7597A7',
      highlights: '#FCF0D8'
    },
    midground: {
      near: '#203548',
      far: '#3C5764'
    },
    foreground: {
      base: '#152B39'
    }
  },

  morning: {
    background: {
      from: '#5DA6EE',
      via: '#B6CEBF',
      to: '#FEEE98'
    },
    mountain: {
      base: '#A3C7E7',
      highlights: '#F0DDC1'
    },
    midground: {
      near: '#4283A3',
      far: '#6095B5'
    },
    foreground: {
      base: '#32606D'
    }
  },

  dusk: {
    background: {
      from: '#372D58',
      via: '#D27F67',
      to: '#FFE699'
    },
    mountain: {
      base: '#E5B5C7',
      highlights: '#F0DDC1'
    },
    midground: {
      near: '#464469',
      far: '#594E77'
    },
    foreground: {
      base: '#423C62'
    }
  },

  evening: {
    background: {
      from: '#09001B',
      via: '#001E58',
      to: '#025484'
    },
    mountain: {
      base: '#01608E',
      highlights: '#F0DDC1'
    },
    midground: {
      near: '#072E4F',
      far: '#054368'
    },
    foreground: {
      base: '#0A001A'
    }
  }

};

const handleTime = (time) => {
  const day = ['dawn', 'morning', 'dusk', 'evening'];
  let prevKey = (time > 0) ? time - 1 : day.length - 1;

  const input = `
    --curtain-from: ${DATA[day[prevKey]].background.from};
    --curtain-via: ${DATA[day[prevKey]].background.via};
    --curtain-to: ${DATA[day[prevKey]].background.to};
  `;

  document.documentElement.style.cssText = input + `
    --background-from: ${DATA[day[prevKey]].background.from}; 
    --background-via: ${DATA[day[prevKey]].background.via}; 
    --background-to: ${DATA[day[prevKey]].background.to};

    --mountain-base: ${DATA[day[prevKey]].mountain.base};
    --mountain-highlights: ${DATA[day[prevKey]].mountain.highlights};

    --midground-near: ${DATA[day[prevKey]].midground.near};
    --midground-far: ${DATA[day[prevKey]].midground.far};

    --foreground-base: ${DATA[day[prevKey]].foreground.base};

    --curtain-opacity: 1;
  `;

  setTimeout(() => {
    document.documentElement.style.cssText = input + `
      --background-from: ${DATA[day[time]].background.from}; 
      --background-via: ${DATA[day[time]].background.via}; 
      --background-to: ${DATA[day[time]].background.to};

      --mountain-base: ${DATA[day[time]].mountain.base};
      --mountain-highlights: ${DATA[day[time]].mountain.highlights};

      --midground-near: ${DATA[day[time]].midground.near};
      --midground-far: ${DATA[day[time]].midground.far};

      --foreground-base: ${DATA[day[time]].foreground.base};

      --curtain-opacity: 0;
    `;
  }, 600);

};

const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = `${hours}:${minutes}:${seconds}`;

  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  return time.join('');
};

const Home = () => {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('/response.json')
      .then(res => res.json())
      .then((res) => { setWeatherData(res) });
  }, [])

  // const DATA_TIME = [0, 1, 2, 3];
  // const timeRef = useRef(getCurrentTime());
  const [timeRef, setTimeRef] = useState(getCurrentTime());
  const prevMin = useRef(0);

  useEffect(() => {
    setInterval(() => {
      const test = getCurrentTime();
      if (prevMin.current != test.split(':')[1]) {
        prevMin.current = test.split(':')[1]
        setTimeRef(test);
      }
    }, 1000);
  }, [])

  const hourlyForecast = weatherData?.forecast.forecastday[0].hour.filter((hf, index) => {
    return index >= new Date().getHours();
  })

  return (
    <div className='relative background-base min-h-[100vh] w-full'>
      {/* <div className="absolute top-0 left-0 min-w-full background-test min-h-[100vh] max-h-[100vh]"></div> */}
      <div className='absolute bottom-0 w-full'>
        <MountainBackground />
      </div>
      <div className='absolute bottom-[12vh] w-full'>
        <MidgroundFar />
      </div>
      <div className='absolute bottom-0 w-full'>
        <MidgroundNear />
      </div>
      <div className='absolute bottom-0 w-full'>
        <Foreground />
      </div>
      <div className='w-[35%] h-full bg-slate-800/30 backdrop-blur-md z-20 absolute right-0 flex flex-col p-3'>

        <div className="flex flex-col gap-10 min-w-full">
          {/* search */}
          <div className="flex flex-row justify-between border-b border-white py-2 px-1">
            <input type="text" className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/75" placeholder='Search location...' />
            <div>O</div>
          </div>

          <div className="flex flex-row w-full justify-center gap-5">
            <p className="text-8xl">{weatherData?.current.temp_c}<span className='font-thin text-3xl align-top'>&#8451;</span></p>
            <div className="min-w-[1px] bg-white"></div>
            <div className="flex flex-col self-center gap-1">
              <p className="text-xl">{weatherData?.location.name}, {weatherData?.location.country}</p>
              <div className="flex flex-row text-sm gap-4">
                <p>{DAYS[new Date().getDay()]}</p>
                <p>{`${timeRef.split(':')[0]}:${timeRef.split(':')[1]} ${timeRef.split(' ')[1]}`}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-8">
            <p>Weather Forecast</p>

            <div className="flex flex-col">
              <div className="flex flex-row w-full justify-evenly items-center">
                <p className="text-7xl"><img src={weatherData?.current.condition.icon} alt="weather current condition"/></p>
                <div className="flex flex-col">
                  <p>{weatherData?.current.condition.text}</p>
                  <p>H: 32 . L: 26</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-start flex-1">
              {hourlyForecast?.map((fcHr, index) => {
                return <HourlyCard key={index} index={index} forecast={fcHr}/>
              })}

            </div>

            <div className="flex flex-col gap-1 items-start flex-1">
              {/* <DailyCard /> */}
            </div>

          </div>
        </div>

        {/* <div>
          <p className='text-white font-bold'>{`${timeRef.split(' ')[0]} : ${timeRef.split(' ')[2]} ${timeRef.split(' ')[5]}`}</p>
        </div> */}
      </div>
    </div>
  )
};

const convert24 = (hour) => {
  if (hour < 13) return hour + 'AM';
  return hour - 12 + 'PM';
}

const HourlyCard = ({index, forecast}) => {
  console.log(index, forecast)
  if (index < 6) {
    return (
      <div className="flex flex-col items-center gap-4 flex-1">
        <p>{index == 0 ? 'Now' : convert24(new Date(forecast?.time).getHours())}</p>
        <img src={forecast?.condition.icon} alt="" />
        <p>{Math.floor(forecast?.temp_c)}<span className='font-thin text-xs align-top'>&deg;</span></p>
      </div>
    )
  }
}

const DailyCard = ({ }) => {
  return (
    <div className="flex flex-row items-center gap-4 min-w-full bg-black">
      <p className='flex-1'>Now</p>
      <p className='flex-1'>0</p>
      <p className='flex-1'>28</p>
    </div>
  )
}

export default Home;