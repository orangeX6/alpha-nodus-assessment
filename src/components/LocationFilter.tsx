import React, { useState, ChangeEvent } from 'react';

export const LocationFilter = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filterByAddress, setFilterByAddress] = useState<boolean>(false);
  const [filterByStatus, setFilterByStatus] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleAddressFilter = () => {
    setFilterByAddress((prev) => !prev);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterByStatus(event.target.value);
  };

  const handleReset = () => {
    setSearchText('');
    setFilterByStatus('');
    setFilterByAddress(false);
  };

  return (
    <div className='flex flex-col gap-2 p-3'>
      <input type='text' placeholder='Search by name' value={searchText} onChange={handleSearchChange} className='w-full p-2' />

      <div className='flex flex-row gap-2'>
        <button
          onClick={handleAddressFilter}
          className={`border flex-1 px-4 py-2 rounded ${filterByAddress ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Address
        </button>
        <select value={filterByStatus} onChange={handleStatusChange} className='border flex-1 px-4 py-2 rounded'>
          <option value=''>All</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
        <button onClick={handleReset} className='border flex-1 px-4 py-2 rounded bg-gray-200 text-gray-700'>
          Reset
        </button>
      </div>
    </div>
  );
};
