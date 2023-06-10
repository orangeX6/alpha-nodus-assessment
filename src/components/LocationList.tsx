import { useFetchLocationsQuery } from '../store';

export const LocationList = () => {
  const { data, error, isFetching } = useFetchLocationsQuery({ tenant: import.meta.env.VITE_TENANT });

  if (data) {
    console.log(data);
  }

  return <div>LocationList</div>;
};
