import { useFetchLocationsQuery } from '../store';
import { LocationType } from '../types/location-type';

export const LocationList = () => {
  const { data, error, isFetching } = useFetchLocationsQuery({ tenant: import.meta.env.VITE_TENANT });

  let locations;
  if (data) {
    locations = data.locationList.resources.map((el: LocationType) => (
      <div className='border rounded p-4 mb-4 relative' id={el.id}>
        <p className='text-lg font-bold'>Title: {el.name}</p>
        {el.status && <span className='bg-yellow-500 text-red-950 text-xs m-5 px-2 py-1 rounded absolute top-0 right-0'>{el.status}</span>}
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

  return <div className='h-80vh overflow-y-scroll p-10'>{locations}</div>;
};
