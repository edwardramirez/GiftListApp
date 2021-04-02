import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import MainScreen from "../screens/MainScreen";
import CreateScreen from "../screens/CreateScreen";
import RecipientScreen from "../screens/RecipientScreen";
import EditScreen from "../screens/EditScreen";
import AddRecipientScreen from "../screens/AddRecipientScreen";

const Stack = createStackNavigator();

function GiftStack() {
  return (
    <Stack.Navigator
      initialRouteName="GiftList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main Screen" component={MainScreen} />
      <Stack.Screen name="Create Screen" component={CreateScreen} />
      <Stack.Screen name="Recipient Screen" component={RecipientScreen} />
      <Stack.Screen name="Edit Screen" component={EditScreen} />
      <Stack.Screen name="Add Person Screen" component={AddRecipientScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  <Stack.Navigator
    initialRouteName="TabStack"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="GiftStack" component={GiftStack} />
  </Stack.Navigator>;
}

function Main() {
  return <GiftStack />;
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    token: state.userReducer.token,
  };
};

export default Main;
