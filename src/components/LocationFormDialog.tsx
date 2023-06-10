import { useState, ChangeEvent, FormEvent } from 'react';
import { LocationType } from '../types/location-type';

interface LocationFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (locationData: Omit<LocationType, 'id' | 'tenant' | 'updatedAt'>) => void;
}

export const LocationFormDialog: React.FC<LocationFormDialogProps> = ({ open, onClose, onSave }) => {
  const initialLocationData: Omit<LocationType, 'id' | 'tenant' | 'updatedAt'> = {
    type: '',
    taxId: '',
    status: 'active',
    npi: '',
    name: '',
    managingOrganization: '',
    description: '',
    alias: '',
    address: '',
  };

  const [locationData, setLocationData] = useState(initialLocationData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(locationData);
    setLocationData(initialLocationData);
    onClose();
  };

  return (
    <div className={`dialog ${open ? 'open' : ''}`}>
      <div className='dialog-overlay' onClick={onClose} />
      <div className='dialog-content bg-neutral-300 text-zinc-800 rounded p-4'>
        <h2 className='text-xl font-bold mb-4'>Create Location</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
          <div className='form-group'>
            <label className='block mb-1'>Name:</label>
            <input
              type='text'
              name='name'
              value={locationData.name}
              onChange={handleInputChange}
              required
              className='input bg-neutral-100'
            />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Status:</label>
            <select name='status' value={locationData.status} onChange={handleInputChange} className='input w-full bg-neutral-100'>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Description:</label>
            <input
              type='text'
              name='description'
              value={locationData.description}
              onChange={handleInputChange}
              className='input bg-neutral-100'
            />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Tax ID:</label>
            <input type='text' name='taxId' value={locationData.taxId} onChange={handleInputChange} className='input bg-neutral-100' />
          </div>

          <div className='form-group col-span-2'>
            <label className='block mb-1'>Address:</label>
            <input
              type='text'
              name='address'
              value={locationData.address}
              onChange={handleInputChange}
              className='input bg-neutral-100 w-full'
            />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Type:</label>
            <input type='text' name='type' value={locationData.type} onChange={handleInputChange} className='input bg-neutral-100' />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>NPI:</label>
            <input type='text' name='npi' value={locationData.npi} onChange={handleInputChange} className='input bg-neutral-100' />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Managing Organization:</label>
            <input
              type='text'
              name='managingOrganization'
              value={locationData.managingOrganization}
              onChange={handleInputChange}
              className='input bg-neutral-100'
            />
          </div>

          <div className='form-group'>
            <label className='block mb-1'>Alias:</label>
            <input type='text' name='alias' value={locationData.alias} onChange={handleInputChange} className='input bg-neutral-100' />
          </div>

          <div className='form-group col-span-2'>
            <button type='submit' className='button button-primary bg-green-600 py-2 px-4 rounded text-white'>
              Save
            </button>
            <button type='button' onClick={onClose} className='button button-secondary py-2 px-4 rounded ml-2 bg-gray-500 text-white'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
