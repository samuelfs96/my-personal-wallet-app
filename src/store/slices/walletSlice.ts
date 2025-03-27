import { WalletState } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WalletState = {
  balance: 0,
  isLoading: false,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBalance, setLoading } = walletSlice.actions;
export default walletSlice.reducer;
