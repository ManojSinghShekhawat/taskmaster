import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
  name: "project",
  initialState: {},
  reducers: {
    projectLoad: (state, action) => {
      return action.payload;
    },
  },
});

export const { projectLoad } = projectSlice.actions;
export default projectSlice.reducer;
