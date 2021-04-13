import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Color from '../resources/Colors';
const Header = ({ label, height }) => {
  return (
    <View style={[styles.headerContainer, { height }]}>
      <Text style={styles.headerText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Color.purple,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    paddingHorizontal: responsiveFontSize(2),
    color: 'white',
  },
});

export default Header;
