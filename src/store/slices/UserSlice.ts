import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { naverSignActions,googleSignActions } from "../actions/SignAction";
import {auth, db} from '../../../firebase'
import { doc, DocumentData, DocumentSnapshot, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {FirebaseError} from 'firebase/app'
import { AxiosError } from "axios";
interface UserStateTypes{
  loading: boolean;
  error: string | null | undefined
  userData: {
    name:string
    email:string
    userImage:string
    uid:string
    timestamp:string;
    username:string;

  }
}

const initialState:UserStateTypes = {
  loading:false,
  userData: {
    name:'',
    email: '',
    userImage:'',
    uid: '',
    timestamp:'',
    username:'',
  },
  error:''
}

export const signInGoogleHandler = createAsyncThunk('user/signinGoogleHandler',async (userInfo) => {
  try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth,provider);
      const user = auth.currentUser?.providerData[0];
      const docRef = doc(db,'users',user!.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists() && user){
        await setDoc(docRef, {
          name: user.displayName,
          email:user.email,
          userImage:user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName?.split(" ").join('').toLowerCase()
        })
      }
  } catch (error) {
    
  }
})

export const signInFacebookHandler = createAsyncThunk('user/siginFacebookHandler',(userInfo) => {

})
// cAT generic: 1. try return값 2. cAT의 매개변수로 사용하는 값 3. rejectValue -> catch return 값
export const signInNaverHandler = createAsyncThunk<UserStateTypes["userData"],naverSignActions,{rejectValue:FirebaseError}>('user/signinNaverHandler', async (userInfo,{rejectWithValue}) => {
  try {
    let user:any = {
    email:userInfo.email,
    uid: userInfo.id,
    name:userInfo.name,
    username:userInfo.nickname,
    userImage:userInfo.profile_image,
    timestamp:serverTimestamp(),
    }
    const docRef = doc(db,'users',user!.uid);
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists() && user){
      await setDoc(docRef,{
        name: user.name,
        email: user.email,
        userImage:user.userImage,
        uid: user.uid,
        timestamp: serverTimestamp(),
        username: user.username
      })
      return user
    }else{
      user = docSnap.data()
      return user
    }
   
  } catch (err) {
    const typedError = err as FirebaseError
    if(!typedError.name){
      throw err
    }
    return rejectWithValue(typedError)
  }
})
// 709 - 713

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(signInNaverHandler.fulfilled,(state,{payload}) => {
      state.loading = false;
      state.error = null
      state.userData = payload
    })
  }
})

export const userReducer = userSlice.reducer;
