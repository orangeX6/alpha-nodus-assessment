import { useState, useMemo, useCallback } from 'react';
import { LocationList } from './components/LocationList';
import './App.css';
import { LocationType } from './types/location-type';
import { LocationDetails } from './components/LocationDetail';

function App() {
  const [location, setLocation] = useState<LocationType | null>();

  const handleLocationClick = useCallback((selectedLocation: LocationType) => {
    setLocation(selectedLocation);
  }, []);

  const removeLocationDetails = useCallback(() => setLocation(null), []);

  const locationDetails = useMemo(() => {
    return location ? (
      <LocationDetails location={location} removeLocationDetails={removeLocationDetails} />
    ) : (
      <p className='text-lg mx-auto'>Click on the Card to get more details</p>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className='flex flex-col w-1/3'>
        <LocationList handleLocationClick={handleLocationClick} />
      </div>
      <div className='flex items-center justify-center w-2/3 h-80vh'>{locationDetails}</div>
    </div>
  );
}

export default App;
