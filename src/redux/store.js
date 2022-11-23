import { configureStore, combineReducers} from '@reduxjs/toolkit'
import auth from './reducers/auth'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import department from './reducers/department';
import locations from './reducers/locations';

const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['auth'] // which reducer want to store
};

const rootReducer = combineReducers({
  auth: auth,
  department : department,
  location : locations
})

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer
})