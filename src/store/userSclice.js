import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL}  from '../config';
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async function (cardID, { rejectWithValue }) {
    try {
      const response = await fetch(
        `${BASE_URL}api/users/${cardID}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async function (userID, { rejectWithValue, getState }) {
    const userBalance = getState().user.user.balance;
    const givenAmount = getState().app.items.amount;
    const updatedAmount = parseFloat(userBalance) - parseFloat(givenAmount);

    try {
      const response = await fetch(
        `${BASE_URL}api/users/${userID}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: updatedAmount,
          }),
        }
      );
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

export const addBonus = createAsyncThunk(
  'user/addBonus',
  async function (userID, { rejectWithValue, getState }) {
    const userBalance = getState().user.user.balance;
    const givenBonus = getState().app.items.bonus;
    const updatedBonus = parseFloat(userBalance) + parseFloat(givenBonus);

    try {
      const response = await fetch(
        `${BASE_URL}api/users/${userID}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: updatedBonus,
          }),
        }
      );
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
  user: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    [updateUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [addBonus.pending]: (state) => {
      state.loading = true;
    },
    [addBonus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addBonus.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
