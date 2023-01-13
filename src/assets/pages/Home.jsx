import React from 'react';
import { Foreground, MidGround1, MidGround2, MountainBackground } from '../images/Background';

const Home = () => {
  return (
    <div className='min-h-[100vh] w-full'>
      <div className='absolute bottom-0'>
        <MountainBackground />
      </div>
      <div className='absolute bottom-28'>
        <MidGround2 />
      </div>
      <div className='absolute bottom-0'>
        <MidGround1 />
      </div>
      <div className='absolute bottom-0'>
        <Foreground />
      </div>
    </div>
  )
}

export default Home