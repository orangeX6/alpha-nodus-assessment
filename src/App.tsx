import { useState } from 'react';
import { LocationList } from './components/LocationList';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex item-center'>
      <LocationList />

      <div>
        <p className='grow read-the-docs'>Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
