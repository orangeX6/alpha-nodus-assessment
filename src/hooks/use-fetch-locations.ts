import { useFetchLocationsQuery } from '../store';

export const useFetchLocations = () => {
  const { data, error, isFetching } = useFetchLocationsQuery({});

  if (data) {
    console.log(data);
  }
};
