import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const user = localStorage.getItem('user')
      if (user) {
        const token = JSON.parse(localStorage.getItem('user')).token
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),
  tagTypes: ['Channel', 'Message'],
  endpoints: builder => ({
    createNewUser: builder.mutation({
      query: user => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Channel', id })), { type: 'Channel', id: 'LIST' }]
          : [{ type: 'Channel', id: 'LIST' }],
    }),
    getMessages: builder.query({
      query: () => 'messages',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Message', id })),
              ...new Set(result.map(({ channelId }) => ({ type: 'Message', id: `CHANNEL_${channelId}` }))),
              { type: 'Message', id: 'LIST' },
            ]
          : [{ type: 'Message', id: 'LIST' }],
    }),
    addMessage: builder.mutation({
      query: message => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: 'channels',
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: name,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, name }) => ({
        url: `messages/${id}`,
        method: 'PATCH',
        body: name,
      }),
    }),
    removeMessage: builder.mutation({
      query: id => ({
        url: `messages/${id}`,
        method: 'DELETE',
        body: 'messages',
      }),
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channel', id },
        { type: 'Channel', id: 'LIST' },
        { type: 'Message', id: `CHANNEL_${id}` },
      ],
    }),
  }),
})

export const {
  useCreateNewUserMutation,
  useLoginMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddChannelMutation,
  useAddMessageMutation,
  useEditChannelMutation,
  useEditMessageMutation,
  useRemoveChannelMutation,
  useRemoveMessageMutation,
} = api
