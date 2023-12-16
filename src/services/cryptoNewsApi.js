import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_CryptoNews_API,
    'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'

};

const baseUrl = "https://real-time-news-data.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
        query: ({ newsCategory,count }) => createRequest(`/search?query=${newsCategory}&limit=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;