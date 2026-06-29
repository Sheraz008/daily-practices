import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import practicesReducer from './practicesSlice';

const practicesPersistConfig = {
  key: 'practices',
  storage: AsyncStorage,
  whitelist: ['category'],
};

const rootReducer = combineReducers({
  practices: persistReducer(practicesPersistConfig, practicesReducer),
});

export default rootReducer;
