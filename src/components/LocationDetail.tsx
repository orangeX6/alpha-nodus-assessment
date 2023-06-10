import { useState, useEffect, ChangeEvent } from 'react';
import { LocationType } from '../types/location-type';
import { useUpdateLocationMutation, useRemoveLocationMutation } from '../store';

export const LocationDetails: React.FC<{ location: LocationType; removeLocationDetails: () => void }> = ({
  location,
  removeLocationDetails,
}) => {
  const [updateLocation] = useUpdateLocationMutation();
  const [removeLocation] = useRemoveLocationMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [npi, setNpi] = useState(location.npi);
  const [taxId, setTaxId] = useState(location.taxId);
  const [alias, setAlias] = useState(location.alias);
  const [status, setStatus] = useState(location.status);

  useEffect(() => {
    setName(location.name);
    setAddress(location.address);
    setNpi(location.npi);
    setTaxId(location.taxId);
    setAlias(location.alias);
    setStatus(location.status);
  }, [location]);

  const handleEditSave = async () => {
    setIsEditMode((prevMode) => !prevMode);

    try {
      await updateLocation({
        locationUpdateId: location.id,
        requestBody: {
          name,
          address,
          npi,
          taxId,
          alias,
          status,
        },
        tenant: import.meta.env.VITE_TENANT,
      });

      console.log('Location updated successfully!');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleDeleteLocation = async () => {
    try {
      await removeLocation({ id: location.id, tenant: import.meta.env.VITE_TENANT });
      console.log('Location removed successfully.');
      removeLocationDetails();
    } catch (error) {
      console.error('Error removing location:', error);
    }
  };

  return (
    <div className='flex flex-col w-full h-full p-10'>
      <div className='flex items-center justify-between'>
        <button className='bg-teal-700 text-white px-4 py-2 rounded' onClick={() => console.log('TO BE IMPLEMENTED')}>
          Refresh
        </button>
        <div className='space-x-4'>
          {isEditMode ? (
            <button className='bg-teal-700 text-white px-4 py-2 rounded' onClick={handleEditSave}>
              Save
            </button>
          ) : (
            <button className='bg-teal-700 text-white px-4 py-2 rounded' onClick={() => setIsEditMode(true)}>
              Edit
            </button>
          )}
          <button className='bg-red-700 px-4 py-2 rounded' onClick={handleDeleteLocation}>
            Delete
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center mt-24'>
        {isEditMode ? (
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='text-2xl font-bold w-full' />
        ) : (
          <h2 className='text-2xl font-bold'>{name}</h2>
        )}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <h3 className='text-lg font-bold'>Location Details</h3>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='mb-2'>
          <p className='mb-2'>Address:</p>
          {isEditMode ? (
            <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='w-full' />
          ) : (
            <p>{address}</p>
          )}
        </div>

        <div className='mb-2'>
          <p className='mb-2'>NPI:</p>
          {isEditMode ? <input type='text' value={npi} onChange={(e) => setNpi(e.target.value)} className='w-full' /> : <p>{npi}</p>}
        </div>

        <div className='mb-2'>
          <p className='mb-2'>Tax ID:</p>
          {isEditMode ? <input type='text' value={taxId} onChange={(e) => setTaxId(e.target.value)} className='w-full' /> : <p>{taxId}</p>}
        </div>
        <div className='mb-2'>
          <p className='mb-2'>Alias:</p>
          {isEditMode ? (
            <input type='text' value={alias} onChange={(e) => setAlias(e.target.value)} className='w-full' />
          ) : (
            <div className='flex flex-wrap gap-2'>
              {alias &&
                alias.split(',').map((tag) => (
                  <span key={tag} className='bg-blue-500 text-white px-2 py-1 rounded'>
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className='mb-2'>
          <p className='mb-2'>Status:</p>
          {isEditMode ? (
            <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full'>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          ) : (
            <p>{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};
