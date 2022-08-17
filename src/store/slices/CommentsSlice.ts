import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseApp, FirebaseError } from "firebase/app";
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, FieldValue, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";


interface CommentsTypes {
  comment:string
  username:string
  userImage: string;
  timestamp: FieldValue | null
  likes: []
  cid: string
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
  email: string
}

export const fetchComments = createAsyncThunk<void,CommentsParamsTypes,{rejectValue:FirebaseError}>('comments/fetchComments', async(commentsInfo,{rejectWithValue}) => {

  try {
    // const docRef = doc(db,'beaches',commentsInfo.beachId,'posts',commentsInfo.pid,'comments')
    const obj:CommentsTypes = {
      comment: commentsInfo.commentToSend,
      username: commentsInfo.username,
      userImage: commentsInfo.userImage,
      timestamp: serverTimestamp(),
      likes: [],
      cid: ''
    }
    const docRef = await addDoc(collection(db,'beaches',commentsInfo.beachId,'posts',commentsInfo.pid,'comments'),obj)
    await updateDoc(doc(db,'beaches',commentsInfo.beachId,'posts',commentsInfo.pid,'comments',docRef.id),{
      cid:docRef.id
    })
    
  } catch (error) {
    const typedError = error as FirebaseError;
    if(!typedError.message){
      throw error
    }
    rejectWithValue(typedError)
  }
})

interface CommentLikesParamsTypes {
  type : string
  beachId: string;
  pid:string
  cid: string;
  email:string
}
export const fetchCommentLikes = createAsyncThunk<void,CommentLikesParamsTypes,{rejectValue:FirebaseError}>('comments/fetchCommentLikes', async(commentLikesInfo,{rejectWithValue}) => {
  console.log(commentLikesInfo)
  const {beachId,cid,pid,email,type} = commentLikesInfo
  try {
   
    if(type === 'ADD'){
      await updateDoc(doc(db,'beaches',beachId,'posts',pid,'comments',cid),{
        likes:arrayUnion(email)
      })
    }
    if(type === 'REMOVE'){
      await updateDoc(doc(db,'beaches',beachId,'posts',pid,'comments',cid),{
        likes:arrayRemove(email)
      })
    }
  } catch (error) {
    const typedError = error as FirebaseError;
    if(typedError.message){
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
    
    }),
    builder.addCase(fetchCommentLikes.fulfilled,(state,action) => {
      console.log('likes')
    }),
    builder.addCase(fetchCommentLikes.rejected,(state,action) => {
      console.error(action.error.message)
    })
  }

})

export const commentsReducer = commentsSlice.reducer;
