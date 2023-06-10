import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { LocationType } from '../../types/location-type';

export const baseURL = 'https://graph.dev.jit.care/graphql';

interface CurrentLocations {
  locationList: {
    resources: LocationType[];
    pages: number;
  };
}

const locationsApi = createApi({
  reducerPath: 'locationsList',
  baseQuery: graphqlRequestBaseQuery({
    url: baseURL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', import.meta.env.VITE_AUTH);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    FetchLocations: builder.query({
      query: ({ tenant, page }) => ({
        document: gql`
          query FetchLocations($tenant: String!, $page: Int) {
            locationList(tenant: $tenant, page: $page) {
              resources {
                address
                alias
                description
                id
                managingOrganization
                name
                npi
                partOf
                status
                tag
                taxId
                type
                updatedAt
                telecom {
                  rank
                  system
                  use
                  value
                }
                tenant
              }
              pages
            }
          }
        `,
        variables: {
          tenant,
          page,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache: CurrentLocations, newItems: CurrentLocations) => {
        console.log(currentCache.locationList.resources.length, newItems.locationList.resources.length);
        // if (currentCache.locationList.resources.length !== newItems.locationList.resources.length) {
        //   return newItems;
        // }
        if (newItems.locationList.pages === 0) {
          return newItems;
        }
        currentCache.locationList.resources.push(...newItems.locationList.resources);
        return currentCache;
      },
      /* eslint-disable */
      // @ts-ignore
      forceRefetch({ currentArg, previousArg }) {
        if (previousArg) return currentArg.page !== previousArg.page;
      },
    }),
    UpdateLocation: builder.mutation({
      query: ({ locationUpdateId, requestBody, locationUpdateTenant2 }) => ({
        document: gql`
          mutation UpdateLocation($locationUpdateId: String!, $requestBody: LocationWriteInput!, $locationUpdateTenant2: String!) {
            locationUpdate(id: $locationUpdateId, requestBody: $requestBody, tenant: $locationUpdateTenant2) {
              resourceID
            }
          }
        `,
        variables: {
          locationUpdateId,
          requestBody,
          locationUpdateTenant2,
        },
      }),
    }),
  }),
});

export { locationsApi };
export const { useFetchLocationsQuery, useLazyFetchLocationsQuery, useUpdateLocationMutation } = locationsApi;
