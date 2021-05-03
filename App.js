import React from 'react';

import { AsyncStorage } from 'react-native';

import { navigationRef } from './navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';

import GiftList from './navigation/AppNavigation';
import { combineReducers } from 'redux';

import giftListReducer from './store/reducers/giftListReducer';
import { createStore } from 'redux';

import { Provider } from 'react-redux';
import { persiStore, persiReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//import FilesystemStorage from 'redux-persist-filesystem-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { applyMiddleware } from 'redux';

// const persistConfig = {
//   key: 'root',
//   storage: FilesystemStorage,
// };

const rootReducer = combineReducers({
  giftListReducer: giftListReducer,
});

//const persistedReducer = persistReducer(persistConfig, rootReducer);

//const store = createStore(persistedReducer, applyMiddleware());

const store = createStore(rootReducer);

//const peristedStore = persistStore(store);

const AppContainer = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <GiftList />
      </NavigationContainer>
    </Provider>
  );
};
export default AppContainer;
