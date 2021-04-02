import React from "react";

import { navigationRef } from "./navigation/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaView, ActivityIndicator } from "react-native";

import GiftList from "./navigation/AppNavigation";
import { combineReducers } from "redux";

import giftListReducer from "./store/reducers/giftListReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  giftListReducer: giftListReducer,
  // recipeintListReducer: recipientReducer,
});

const store = createStore(rootReducer);

const AppContainer = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <GiftList />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};
export default AppContainer;
