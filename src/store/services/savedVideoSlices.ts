import {VideoItemType} from '@/types/youtube';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SavedVideosState {
  savedVideos: VideoItemType[];
}

const initialState: SavedVideosState = {
  savedVideos: [],
};

const savedVideosSlice = createSlice({
  name: 'savedVideos',
  initialState,
  reducers: {
    saveVideo: (state, action: PayloadAction<VideoItemType>) => {
      const exists = state.savedVideos.some(
        video => video.id === action.payload.id,
      );
      if (!exists) {
        state.savedVideos.push(action.payload);
      }
    },
    removeVideo: (state, action: PayloadAction<string>) => {
      state.savedVideos = state.savedVideos.filter(
        video => video.id !== action.payload,
      );
    },
  },
});

export const {saveVideo, removeVideo} = savedVideosSlice.actions;
export default savedVideosSlice.reducer;
