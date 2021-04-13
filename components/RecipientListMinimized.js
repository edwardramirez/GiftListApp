import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Modal from 'react-native-modal';

import { useNavigation } from '@react-navigation/native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CurrencyInput from 'react-native-currency-input';

import Colors from '../resources/Colors';
import CreateCancelButton from './CreateCancelButton';

import giftRecipient from '../models/RecipientModel';

import { addRecipient } from '../store/actions/giftLists';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const recipientModal = () => {
  return (
    <Modal>
      <View>
        <Text>Hello</Text>
      </View>
    </Modal>
  );
};
const Recipients = (props) => {
  //console.log(props);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  //add new recipient modal
  const [showSubMenu, setShowSubMenu] = useState(false);

  const closeSubMenu = () => {
    setShowSubMenu(false);
  };

  const newRecipient = new giftRecipient();
  newRecipient.id = Math.random();
  newRecipient.name = name;
  newRecipient.budget = price;
  newRecipient.description = description;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topContainer}>
        <View style={{}}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>

        <View style={{ flex: 1.5 }}>
          <View style={styles.bottomContainer}>
            <ProgressSteps
              topOffset={0}
              labelFontSize={responsiveFontSize(1.5)}
            >
              <ProgressStep label='idea'></ProgressStep>
              <ProgressStep label='Purchased'></ProgressStep>
              <ProgressStep label='Wrapped'>
                <View style={{ alignItems: 'center' }}>
                  <Text>This is the content within step 2!</Text>
                </View>
              </ProgressStep>
              <ProgressStep label='Gifted'>
                <View style={{ alignItems: 'center' }}>
                  <Text>This is the content within step 3!</Text>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveFontSize(20),
    width: '100%',
    borderRadius: 10,
    elevation: 10,
    marginVertical: responsiveFontSize(2),
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    padding: responsiveFontSize(0.5),
  },

  plusContainer: {
    justifyContent: 'center',
    paddingHorizontal: responsiveFontSize(1),
    backgroundColor: 'red',
  },

  nameText: {
    paddingTop: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(1),
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionText: {
    color: 'black',
    // backgroundColor: "green",
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    alignItems: 'center',
  },
  createRecipientContainer: {
    height: responsiveScreenHeight(65),
    backgroundColor: 'white',
  },
  textInputStyle: {
    width: '100%',
    height: responsiveFontSize(8),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  descriptionInputStyle: {
    width: '100%',
    height: responsiveFontSize(16),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(5),
    paddingTop: responsiveFontSize(2),
  },
  formContainer: {
    paddingHorizontal: responsiveFontSize(2),
    paddingTop: responsiveFontSize(2),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
});

export default Recipients;
