import { useState } from 'react';
import { LocationList } from './components/LocationList';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className='flex flex-col w-1/3'>
        <LocationList />
      </div>

      <div className='flex items-center justify-center w-2/3 h-80vh'>
        <p className='text-lg mx-auto'>Click on the Card to get more details</p>
      </div>
    </div>
  );
}

export default App;
