import React from 'react';
import { Foreground, MidGround1, MidGround2, MountainBackground } from '../images/Background';

const Home = () => {
  return (
    <div className='min-h-[100vh] w-full'>
      <div className='absolute bottom-0 w-full'>
        <MountainBackground />
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
        <button className='p-4 text-white font-bold'>Change Time</button>
      </div>
    </div>
  )
}

export default Home