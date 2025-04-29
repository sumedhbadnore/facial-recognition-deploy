// src/redux/faceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FaceState {
  detections: any[];
  webcamActive: boolean;
}

const initialState: FaceState = {
  detections: [],
  webcamActive: false,
};

const faceSlice = createSlice({
  name: "face",
  initialState,
  reducers: {
    setDetections(state, action: PayloadAction<any[]>) {
      state.detections = action.payload;
    },
    toggleWebcam(state) {
      state.webcamActive = !state.webcamActive;
    },
  },
});

export const { setDetections, toggleWebcam } = faceSlice.actions;
export default faceSlice.reducer;
