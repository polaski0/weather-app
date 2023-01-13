import React, { useState } from 'react';
import { Foreground, MidGround1, MidGround2, MountainBackground } from '../images/Background';

const Home = () => {

  const DATA_TIME = [0, 1, 2, 3];
  const [time, setTime] = useState(0);
  let gen;

  const handleChangeTime = () => {
    const getTime = () => {
      gen = DATA_TIME[Math.floor(Math.random() * DATA_TIME.length)]
      if(gen == time) getTime();
    };

    getTime();
    setTime(gen)
  }

  return (
    <div className='min-h-[100vh] w-full'>
      <div className='absolute bottom-0 w-full'>
        <MountainBackground time={time}/>
      </div>
      <div className='absolute bottom-[12vh] w-full'>
        <MidGround2 />
      </div>
      <div className='absolute bottom-0 w-full'>
        <MidGround1 />
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
}

export default Home