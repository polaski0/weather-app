import React, { useEffect, useState, useRef } from 'react';
import { Foreground, MidgroundFar, MidgroundNear, MountainBackground } from '../images/Background';
import '../svg.css';

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

  // const input = `
  //   --curtain-from: ${DATA[day[prevKey]].background.from};
  //   --curtain-via: ${DATA[day[prevKey]].background.via};
  //   --curtain-to: ${DATA[day[prevKey]].background.to};

  //   --background-from: ${DATA[day[time]].background.from}; 
  //   --background-via: ${DATA[day[time]].background.via}; 
  //   --background-to: ${DATA[day[time]].background.to}; 

  //   --mountain-base: ${DATA[day[time]].mountain.base};
  //   --mountain-highlights: ${DATA[day[time]].mountain.highlights};

  //   --midground-near: ${DATA[day[time]].midground.near};
  //   --midground-far: ${DATA[day[time]].midground.far};

  //   --foreground-base: ${DATA[day[time]].foreground.base};
  // `;

  // document.documentElement.style.cssText = input + `
  //     --curtain-opacity: 1;
  //   `;

  // setTimeout(() => {
  //   document.documentElement.style.cssText = input + `
  //     --curtain-opacity: 0;
  //   `;
  // }, 1000);
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
  }, 800);

};

const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let session = 'AM';

  if (hours == 0) {
    hours = 12;
  }

  if (hours >= 12) {
    hours = hours - 12;
    session = 'PM';
  }

  hours = hours <= 0 ? "0" + hours : hours;
  minutes = minutes <= 0 ? "0" + minutes : minutes;
  seconds = seconds <= 0 ? "0" + seconds : seconds;

  return `${hours} : ${minutes} : ${seconds} ${session}`;
};

const Home = () => {
  const DATA_TIME = [0, 1, 2, 3];
  const [time, setTime] = useState(0);

  const handleChangeTime = () => {
    setTime((prevState) => {
      return prevState >= DATA_TIME.length - 1 ? 0 : prevState + 1;
    });
  }

  useEffect(() => {
    handleTime(time);
  }, [time]);

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
      <div className='w-[35%] h-full bg-slate-800/30 z-20 absolute right-0 flex flex-col justify-center items-center'>
        <button className='p-4 text-white font-bold' onClick={handleChangeTime}>Change Time</button>
        <div>
          <p className='text-white font-bold'>{time}</p>
        </div>
      </div>
    </div>
  )
};

export default Home;