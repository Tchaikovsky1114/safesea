import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseApp, FirebaseError } from "firebase/app";
import { addDoc, collection, DocumentData, FieldValue, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";


interface CommentsTypes {
  comment:string
  username:string
  userImage: string;
  timestamp: FieldValue | null
  like: number
  cid: number
}
interface CommentsInitialStateTypes {
  comments: CommentsTypes[]
  status: {
    loading: boolean,
    error: string
  }
}

const initialState:CommentsInitialStateTypes = {
  comments : [],
  status : {
    loading: false, 
    error: ''
  }
}


interface CommentsParamsTypes {
  commentToSend: string;
  username: string;
  userImage: string;
  beachId: string;
  pid: string;
}

export const fetchComments = createAsyncThunk<void,CommentsParamsTypes,{rejectValue:FirebaseError}>('comments/fetchComments', async(commentsInfo,{rejectWithValue}) => {

  try {
    const obj:CommentsTypes = {
      comment: commentsInfo.commentToSend,
      username: commentsInfo.username,
      userImage: commentsInfo.userImage,
      timestamp: serverTimestamp(),
      like: 0,
      cid: new Date().getTime() + Math.random()
    }
    await addDoc(collection(db,'beaches',commentsInfo.beachId,'posts',commentsInfo.pid,'comments'),obj)

    
  } catch (error) {
    const typedError = error as FirebaseError;
    if(!typedError.message){
      throw error
    }
    rejectWithValue(typedError)
  }
})



const commentsSlice = createSlice({
  name:'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state,action) => {
    
    })
  }

})

export const commentsReducer = commentsSlice.reducer;
