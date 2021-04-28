import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Color from '../resources/Colors';
const Header = ({ label, height, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      {onPress ? (
        <View>
          <TouchableOpacity onPress={onPress}>
            <FontAwesome5
              style={styles.arrow}
              name='arrow-left'
              color={'white'}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}

      <Text style={styles.headerText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Color.purple,
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: responsiveHeight(14),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    paddingHorizontal: responsiveFontSize(2),
    color: 'white',
  },
  arrow: { padding: responsiveFontSize(2) },
});

export default Header;
