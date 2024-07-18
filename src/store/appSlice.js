import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getInfoFromDB = createAsyncThunk(
  'app/getInfoFromDB',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${proccess.env.BASE_URL}users/`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error('Server Error!');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: {
    bonus: 0,
    amount: 0,
    cube: 0,
    price: 1.7,
  },

  users: [],
  loading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    incrementAmount(state) {
      const incrementValue = 5;
      state.items.amount = state.items.amount + incrementValue;
      state.items.cube = (state.items.amount / state.items.price).toFixed(2);
      state.items.bonus = (state.items.amount * 0.15).toFixed(2);
    },
    decrementAmount(state) {
      const decrementValue = 5;
      if (state.items.amount > 0) {
        state.items.amount = state.items.amount - decrementValue;
        state.items.cube = (state.items.amount / state.items.price).toFixed(2);
        state.items.bonus = (state.items.amount * 0.15).toFixed(2);
      }
    },
    reset(state) {
      state.items.amount = 0;
      state.items.bonus = 0;
      state.items.cube = 0;
    },
  },
  extraReducers: {
    [getInfoFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getInfoFromDB.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getInfoFromDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
