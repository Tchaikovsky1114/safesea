import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GoogleAuthProvider, signInWithPopup, UserInfo, FacebookAuthProvider} from 'firebase/auth'
import { naverSignActions,googleSignActions } from "../actions/SignAction";
import {auth, db, storage} from '../../../firebase'
import { doc, DocumentData, DocumentSnapshot, FieldValue, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {FirebaseError} from 'firebase/app'
import { AxiosError } from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
interface UserStateTypes{
  loading: boolean;
  error: string | null | undefined
  userData: {
    name:string
    email:string
    userImage:string
    uid:string
    timestamp: FieldValue | null;
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
    timestamp: null,
    username:'',
  },
  error:''
}



// UserInfo type definition
//  displayName: string | null;
//  email: string | null;
//  phoneNumber: string | null;
//  photoURL: string | null;
//  providerId: string;
//  uid: string;

type SocialSignType = UserStateTypes["userData"] | DocumentData
export const signInGoogleHandler = createAsyncThunk<SocialSignType,void,{rejectValue:FirebaseError}>('user/signinGoogleHandler',async (_,{rejectWithValue}) => {
  try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth,provider);
      const user = auth.currentUser?.providerData[0];
      
      if(!user?.displayName || !user.email || !user.photoURL) return

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
        const newUser:UserStateTypes["userData"] = {
          name: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username:user.displayName?.split(" ").join('').toLowerCase()
        }
        return newUser
      }else{
        return docSnap.data()
      }
      
  } catch (err) {
    const typedError = err as FirebaseError
    if(!typedError.name){
      throw err
    }
    return rejectWithValue(typedError)
  }
})


export const signInFacebookHandler = createAsyncThunk<SocialSignType,void,{rejectValue:FirebaseError}>('user/siginFacebookHandler',async(_,{rejectWithValue}) => {
  try {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth,provider)
    const user = auth.currentUser?.providerData[0];
    if(!user?.displayName || !user.email || !user.photoURL) return
    const docRef = doc(db,'users',user!.uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists() && user){
      await setDoc(docRef,{
        name: user.displayName,
        email:user.email,
        userImage:user.photoURL,
        uid:user.uid,
        timestamp:serverTimestamp(),
        username:user.displayName?.split(' ').join('').toLowerCase()
      })
      const newUser:UserStateTypes["userData"] = {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
        username:user.displayName?.split(" ").join('').toLowerCase()
      }
      return newUser
    }else{
      return docSnap.data()
    }
  } catch (error) {
    console.error(error)
  }

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




type UpdateCurrentUserProfileName = Pick<UserStateTypes["userData"], "uid" | "username">
type UpdateUserName = Pick<UserStateTypes["userData"], "username">
export const updateUserProfileNameHandler = createAsyncThunk<UpdateUserName,UpdateCurrentUserProfileName,{rejectValue:FirebaseError}>("user/updateUserProfileHandler", async (currentUser,{rejectWithValue}) => {
  
  try{
    const docRef = await doc(db,'users',currentUser.uid)
    await updateDoc(docRef, {
      username: currentUser.username
    })
    return {username:currentUser.username}
    
  }catch(err) {
    const typedError = err as FirebaseError
    if(!typedError.name){
      throw err
    }
    return rejectWithValue(typedError)
  }
})

type UpdateCurrentUserProfileImage = Pick<UserStateTypes["userData"], "uid" | "userImage">
type UpdateUserImage = Pick<UserStateTypes["userData"],"userImage">
export const updateUserProfileImageHandler = createAsyncThunk<UpdateUserImage,UpdateCurrentUserProfileImage,{rejectValue:FirebaseError}>("user/updateUserProfileImageHandler", async (currentUser,{rejectWithValue}) => {
  
  
  try {
    const image = currentUser.userImage;
    const docRef = await doc(db,'users',currentUser.uid)
    const imageRef = ref(storage,`users/${docRef.id}/profileImage`);
    
    
    uploadString(imageRef,image,"data_url").then(async(snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      await updateDoc(doc(db,'users',docRef.id), {
        userImage:downloadURL
      })
    })
    return {userImage:currentUser.userImage}
  } catch (err) {
    const typedError = err as FirebaseError
    if(!typedError.name){
      throw err
    }
    return rejectWithValue(typedError)  
  }
  
})


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
    builder.addCase(signInGoogleHandler.fulfilled,(state,{payload}) => {
      state.loading = false;
      state.error = null 
      state.userData.email = payload.email
      state.userData.name = payload.username
      state.userData.userImage = payload.userImage
      state.userData.uid = payload.uid
      state.userData.timestamp = payload.timestamp
      state.userData.username = payload.username
    })
    builder.addCase(updateUserProfileNameHandler.fulfilled,(state,{payload}) => {
      state.loading = false;
      state.error = null;
      state.userData.username = payload.username
    })
    builder.addCase(signInFacebookHandler.fulfilled,(state,{payload}) => {
      state.loading = false;
      state.error = null 
      state.userData.email = payload.email
      state.userData.name = payload.username
      state.userData.userImage = payload.userImage
      state.userData.uid = payload.uid
      state.userData.timestamp = payload.timestamp
      state.userData.username = payload.username
    })
    builder.addCase(updateUserProfileImageHandler.fulfilled,(state,{payload}) => {
      state.loading = false;
      state.error = null;
      state.userData.userImage = payload.userImage
    })
  }
})

export const userReducer = userSlice.reducer;
