import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch } from 'react-redux';

import CurrencyInput from 'react-native-currency-input';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Colors from '../resources/Colors';

import DatePicker from '../components/DatePicker';
import AcceptButton from '../components/AcceptButton';

import giftRecipient from '../models/RecipientModel';

import { addGiftList } from '../store/actions/giftLists';

const CreateScreen = (props) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [budget, setBudget] = useState('');

  //used to pass data to store
  const dispatch = useDispatch();
  //validates create form
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (title.length > 0) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [title]);

  const submitGiftList = () => {
    if (validate) {
      dispatch(addGiftList(title, budget, String(date), []));
      props.navigation.goBack();
    } else {
      Alert.alert('Alert', 'The giftlist needs a title!', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesome5
              style={styles.arrow}
              name='arrow-left'
              color={'black'}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Create giftlist</Text>
        </View>
        <View
          style={[styles.fieldContainer, { marginTop: responsiveFontSize(2) }]}
        >
          <Text style={styles.fieldTtitleText}>TITLE</Text>
          <TextInput
            style={styles.textInputStyle}
            value={title}
            placeholderStyle={{ fontWeight: 'bold' }}
            placeholder='List Title'
            onChangeText={(title) => setTitle(title)}
          ></TextInput>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>BUDGET</Text>
          <CurrencyInput
            style={styles.textInputStyle}
            value={budget}
            onChangeValue={setBudget}
            placeholder='$0.00'
            unit='$'
            delimiter=','
            separator='.'
            precision={2}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>DUE DATE</Text>
          <DatePicker label='Date' date={date} setDate={setDate} />
        </View>
        <View style={styles.buttonContainer}>
          <AcceptButton buttonName='CREATE' onPress={submitGiftList} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
  },
  headerContainer: {
    height: responsiveFontSize(15),
    backgroundColor: '#E5E5E5',
    alignItems: 'flex-end',
    flexDirection: 'row',
    borderRadius: responsiveFontSize(2),
    padding: responsiveFontSize(1),
  },

  arrow: {
    padding: responsiveFontSize(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),

    fontWeight: 'bold',
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
  fieldTtitleText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(5),
  },
  buttonContainer: {
    marginBottom: responsiveFontSize(2),
    paddingBottom: responsiveFontSize(2),
    marginHorizontal: responsiveFontSize(2),
  },
  fieldContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    padding: responsiveFontSize(2),
    marginBottom: responsiveFontSize(2),
    marginHorizontal: responsiveFontSize(2),
  },
});

export default CreateScreen;
