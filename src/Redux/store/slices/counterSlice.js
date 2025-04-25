import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * 异步 action creator
 * 模拟异步增加操作
 */
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

/**
 * 初始状态
 * value: 计数器的值
 * status: 异步操作的状态
 */
const initialState = {
  value: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

/**
 * 创建 Counter Slice
 * 包含同步和异步操作的处理
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**
     * 增加计数
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含增加的数值
     */
    increment: (state) => {
      state.value += 1;
    },

    /**
     * 减少计数
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含减少的数值
     */
    decrement: (state) => {
      state.value -= 1;
    },

    /**
     * 增加指定数值
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含增加的数值
     */
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  /**
   * 额外的 reducer，处理异步 action 的不同状态
   */
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// 导出 action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

/**
 * 选择器函数
 */
export const selectCount = (state) => state.counter.value;
export const selectStatus = (state) => state.counter.status;

// 导出 reducer
export default counterSlice.reducer;
