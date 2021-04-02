import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const AcceptButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
        <Text style={styles.textStyle}>{props.buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    height: responsiveFontSize(8),
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#923ac5",
  },
  textStyle: { color: "white", fontWeight: "bold" },
});

export default AcceptButton;
