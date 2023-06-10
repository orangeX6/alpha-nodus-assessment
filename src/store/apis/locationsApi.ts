import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const baseURL = 'https://graph.dev.jit.care/graphql';

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
      query: ({ tenant }) => ({
        document: gql`
          query FetchLocations($tenant: String!) {
            locationList(tenant: $tenant) {
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
            }
          }
        `,
        variables: {
          tenant,
        },
      }),
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
