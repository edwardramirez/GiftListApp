import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MainScreen from '../screens/MainScreen';
import CreateScreen from '../screens/CreateScreen';
import RecipientScreen from '../screens/RecipientScreen';
import EditScreen from '../screens/EditScreen';
import AddRecipientScreen from '../screens/AddRecipientScreen';
import PastGiftListScreen from '../screens/PastGiftListScreen';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import Color from '../resources/Colors';

import Header from '../components/Header';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const GiftStack = () => (
  <Stack.Navigator
    initialRouteName='GiftList'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='Main Screen' component={TabStack} />
    <Stack.Screen name='Create Screen' component={CreateScreen} />
    <Stack.Screen name='Recipient Screen' component={RecipientScreen} />
    <Stack.Screen name='Edit Screen' component={EditScreen} />
    <Stack.Screen name='Add Person Screen' component={AddRecipientScreen} />
  </Stack.Navigator>
);

const TabStack = () => (
  <SafeAreaView style={styles.AndroidSafeArea}>
    <Header label={'MY GIFTLIST!'} height={responsiveHeight(10)} />
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: Color.purple,
          overflow: 'hidden',
        },
      }}
    >
      <Tab.Screen name='CURRENT' component={MainScreen} />
      <Tab.Screen name='PAST' component={PastGiftListScreen} />
    </Tab.Navigator>
  </SafeAreaView>
);
const Main = () => {
  return <GiftStack />;
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Main;
