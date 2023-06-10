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
      query: ({ tenant, page, status }) => ({
        document: gql`
          query FetchLocations($tenant: String!, $page: Int, $status: String) {
            locationList(tenant: $tenant, page: $page, status: $status) {
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
          status,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache: CurrentLocations, newItems: CurrentLocations, { arg }) => {
        console.log(currentCache.locationList.resources.length, newItems.locationList.resources.length);
        // if (currentCache.locationList.resources.length !== newItems.locationList.resources.length) {
        //   return newItems;
        // }
        if (arg.page === 0) {
          return newItems;
        }

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
    CreateLocation: builder.mutation({
      query: ({ requestBody, tenant }) => ({
        document: gql`
          mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
            locationCreate(requestBody: $requestBody, tenant: $tenant) {
              resourceID
            }
          }
        `,
        variables: {
          requestBody: requestBody,
          tenant: tenant,
        },
        refetchQueries: ['FetchLocations'],
      }),
    }),

    UpdateLocation: builder.mutation({
      query: ({ locationUpdateId, requestBody, tenant }) => ({
        document: gql`
          mutation UpdateLocation($locationUpdateId: String!, $requestBody: LocationWriteInput!, $tenant: String!) {
            locationUpdate(id: $locationUpdateId, requestBody: $requestBody, tenant: $tenant) {
              resourceID
            }
          }
        `,
        variables: {
          locationUpdateId,
          requestBody,
          tenant,
        },
        refetchQueries: ['FetchLocations'],
      }),
    }),

    RemoveLocation: builder.mutation({
      query: ({ id, tenant }) => ({
        document: gql`
          mutation LocationRemove($id: String!, $tenant: String!) {
            locationRemove(id: $id, tenant: $tenant) {
              resourceID
            }
          }
        `,
        variables: {
          id,
          tenant,
        },
        refetchQueries: ['FetchLocations'],
      }),
    }),
  }),
});

export { locationsApi };
export const {
  useFetchLocationsQuery,
  useLazyFetchLocationsQuery,
  useUpdateLocationMutation,
  useCreateLocationMutation,
  useRemoveLocationMutation,
} = locationsApi;
