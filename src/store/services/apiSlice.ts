import {GetVideosParams, YouTubeVideoResponse} from '@/types/youtube';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyBGnHMN-tDg43gjwwpXcWj1fsjXTH28oQw';

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: builder => ({
    getVideos: builder.query<YouTubeVideoResponse, GetVideosParams>({
      query: params => ({
        url: '/videos',
        params: {
          ...params,
          key: API_KEY,
        },
      }),
    }),
  }),
});

export const {useGetVideosQuery} = apiSlice;
