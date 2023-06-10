import { useEffect, useState } from 'react';
import { RootState, useLazyFetchLocationsQuery } from '../store';

export const useLazyFetchLocations = () => {
  const [page, setPage] = useState(0);

  const [getLocations, { data, error, isFetching }] = useLazyFetchLocationsQuery();

  useEffect(() => {
    console.log('use effect');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const listContainer = document.querySelector('.location-list-container')!;

    const onScroll = () => {
      const scrolledToBottom = listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight - 400;

      if (scrolledToBottom && !isFetching && data && page !== data.locationList.pages - 1) {
        setPage((prev) => prev + 1);
      }
    };

    listContainer.addEventListener('scroll', onScroll);

    return function () {
      listContainer.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isFetching]);

  useEffect(() => {
    // setPage((prev) => 0);
    getLocations({ tenant: import.meta.env.VITE_TENANT, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { data, error, isFetching };
};
