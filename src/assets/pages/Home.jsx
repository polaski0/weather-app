import React, { useEffect, useState } from 'react';
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
  let key;
  switch (time) {
    case 0: key = 'dawn'; break;
    case 1: key = 'morning'; break;
    case 2: key = 'dusk'; break;
    case 3: key = 'evening'; break;
    default: key = 'morning'; break;
  }

  document.documentElement.style.cssText = `
  --background-from: ${DATA[key].background.from}; 
  --background-via: ${DATA[key].background.via}; 
  --background-to: ${DATA[key].background.to}; 

  --mountain-base: ${DATA[key].mountain.base};
  --mountain-highlights: ${DATA[key].mountain.highlights};

  --midground-near: ${DATA[key].midground.near};
  --midground-far: ${DATA[key].midground.far};

  --foreground-base: ${DATA[key].foreground.base};
  `;
};

const Home = () => {

  const DATA_TIME = [0, 1, 2, 3];
  const [time, setTime] = useState(0);
  // let gen;

  // const handleChangeTime = () => {
  //   const getTime = () => {
  //     gen = DATA_TIME[Math.floor(Math.random() * DATA_TIME.length)]
  //     if (gen == time) getTime();
  //   };

  //   getTime();
  //   setTime(gen)
  // };

  const handleChangeTime = () => {
    setTime((prevState) => {
      return prevState >= DATA_TIME.length - 1 ? 0 : prevState + 1;
    });
  }

  useEffect(() => {
    handleTime(time);
  }, [time]);

  return (
    <div className='background-base min-h-[100vh] w-full'>
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
      <div className='w-[35%] h-full bg-slate-800/30 z-20 absolute right-0 flex justify-center items-center'>
        <button className='p-4 text-white font-bold' onClick={handleChangeTime}>Change Time</button>
        <div>{time}</div>
      </div>
    </div>
  )
};

export default Home;