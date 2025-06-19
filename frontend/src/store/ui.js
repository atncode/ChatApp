import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: { isOpened: false, type: null, extra: { channelId: null } },
  currentChannelId: '1',
  defaultChannelId: '1',
  channelNameForRename: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload
    },
    setModalInfo: (state, { payload }) => {
      state.modal = payload
    },
    setIsModalOpened: (state, { payload }) => {
      state.modal.isOpened = payload
    },
    setTypeModal: (state, { payload }) => {
      state.modal.type = payload
    },
    setExtraModal: (state, { payload }) => {
      state.modal.extra.channelId = payload
    },
    setChannelNameForRename: (state, { payload }) => {
      state.channelNameForRename = payload
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
