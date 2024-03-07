import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tableServices } from "../../utils/tableServices";

type RightSideState = {
  leaderboard: any[];
};

const initialState = {
  leaderboard: [],
} as RightSideState;

export const get_leaderboard = createAsyncThunk(
  'rightSide/get_leaderboard',
  async () => {
    const {resJson} = await tableServices.getLeaderboard();
    return resJson;
  }
);

const rightSideSlice = createSlice({
  name: "rightSideSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_leaderboard.fulfilled, (state, action) => {
      state.leaderboard = [];
      state.leaderboard.push(...action.payload.data);
    })
  }
});

const rightSide_reducer = rightSideSlice.reducer;
export default rightSide_reducer;
