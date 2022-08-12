import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from './slices/UserSlice'
import { PersistConfig,persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




export const rootReducer = combineReducers({
  user:userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    }
  })
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export let persistor = persistStore(store)