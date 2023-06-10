import { useState } from 'react';
import { LocationFilter } from './LocationFilter';
import { LocationFormDialog } from './LocationFormDialog';

import { LocationType } from '../types/location-type';
import { useLazyFetchLocations } from '../hooks';
import { useCreateLocationMutation } from '../store';

export const LocationList: React.FC<{ handleLocationClick: (location: LocationType) => void }> = ({ handleLocationClick }) => {
  const { data, error, isFetching, refetch } = useLazyFetchLocations();
  const [createLocation] = useCreateLocationMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveLocation = async (locationData: Omit<LocationType, 'id' | 'tenant' | 'updatedAt'>) => {
    // Perform save logic here
    try {
      await createLocation({ requestBody: locationData, tenant: import.meta.env.VITE_TENANT });

      console.log('Location data:', locationData);
    } catch (err) {
      console.log(err);
    }
  };

  let locations;

  if (isFetching) {
    locations = <p>Loading...</p>;
  }

  if (data) {
    locations = data.locationList.resources.map((el: LocationType) => (
      <div className='border rounded p-4 mb-4 relative' key={el.id} onClick={() => handleLocationClick(el)}>
        <p className='text-lg font-bold'>Title: {el.name}</p>
        {el.status && <span className='bg-yellow-500 text-red-950 text-xs m-5 px-2 rounded-full absolute top-0 right-0'>{el.status}</span>}
        <p className='text-sm font-medium mb-2 text-gray-300'>Address: {el.address}</p>
        <div className='flex justify-between items-center '>
          <div className='flex flex-row gap-12'>
            <p className='text-xs text-gray-400'>🗓️: {new Date(el.updatedAt).toLocaleDateString()}</p>
            <p className='text-xs text-gray-400'>⌚Time: {new Date(el.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className='flex items-center justify-between py-5'>
        <button className='border border-gray-400 rounded px-4 py-2 flex-grow-0' onClick={refetch}>
          <span role='img' aria-label='Refresh'>
            🔃
          </span>
        </button>
        <h1 className='text-2xl font-bold'>Locations</h1>
        <button className='border border-gray-400 rounded px-4 py-2 flex-grow-0' onClick={handleOpenDialog}>
          +
        </button>
      </div>
      <div>
        <LocationFilter />
      </div>

      <div className='h-80vh overflow-y-scroll p-10 location-list-container'>{locations}</div>
      <LocationFormDialog open={isDialogOpen} onClose={handleCloseDialog} onSave={handleSaveLocation} />
    </>
  );
};
