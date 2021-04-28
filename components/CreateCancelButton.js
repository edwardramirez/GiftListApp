import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

let a = '';
const createCancelButton = (props) => {
  a = props.buttonColor;
  return (
    <View style={styles().container}>
      <TouchableOpacity
        style={styles(props.buttonColor).buttonContainer}
        onPress={props.onPress}
      >
        <Text style={styles().textStyle}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    container: { flex: 1, padding: responsiveFontSize(1) },
    buttonContainer: {
      height: responsiveFontSize(8),
      borderRadius: 10,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: a,
    },
    textStyle: { color: 'white', fontWeight: 'bold' },
  });

export default createCancelButton;
