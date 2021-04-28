import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const NextPreviousButton = ({ nextButton, previousButton }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={previousButton}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>PREVIOUS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={nextButton}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>NEXT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {},
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#2D8CE3',
  },
});

export default NextPreviousButton;
