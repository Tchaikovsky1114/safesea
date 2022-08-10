import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {GoogleAuthProvider} from 'firebase/auth'


const initialState = {
  loading:false,
  userData: {
    name:'',
    email: '',
    refreshToken:'',
    userImage:'',
    uid: '',
    timestamp:'',
    username:'',
  },
  error:'',
}

export const signInGoogleHandler = createAsyncThunk('user/signinGoogleHandler',(userInfo) => {
  try {
      const provider = new GoogleAuthProvider();
  } catch (error) {
    
  }
})

export const signInFacebookHandler = createAsyncThunk('user/siginFacebookHandler',(userInfo) => {

})

export const siginInKaKaoHandler = createAsyncThunk('user/signinKakaoHandler', (userInfo) => {

})

export const signInNaverHandler = createAsyncThunk('user/signInNaverHandler',(userInfo) => {

})


const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(signInGoogleHandler.fulfilled,() => {

    })
  }
})

export const userReducer = userSlice.reducer;