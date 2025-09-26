import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Props = {
  logo: string;
  tagline: string;
  heroImage: string;
  aboutImage: string;
  subTagline: string;
  supportEmail: string;
  phoneNo: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  _id: string;
};

type WebContentState = {
  content: Props | null;
};

const initialState: WebContentState = {
  content: null,
};

const webContentSlice = createSlice({
  name: 'webContent',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<Props>) => {
      state.content = action.payload;
    },
    clearContent: (state) => {
      state.content = null;
    },
  },
});

export const { setContent, clearContent } = webContentSlice.actions;
export default webContentSlice.reducer;
