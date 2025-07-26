import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/v1/tasks/mytasks");

      return res.data.tasksWithProjects;
    } catch (error) {
      console.log("API Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "task/updateTaskStatus",
  async ({ taskId, newStatus }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/api/v1/tasks/${taskId}`, {
        status: newStatus,
      });
      return response.data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task status"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: true,
    error: null,
  },
  reducers: {
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;

      const task = state.tasks.find((t) => t._id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(updateTaskStatusAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
