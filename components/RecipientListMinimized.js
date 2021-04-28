import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CurrencyInput from 'react-native-currency-input';

import Colors from '../resources/Colors';
import CreateCancelButton from './CreateCancelButton';

import { deleteRecipient, editRecipient } from '../store/actions/giftLists';

import ProgressCircle from 'react-native-progress-circle';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const percentageCircleHelper = (status, completed) => {
  //idea,bought,wrapped,gifted
  const fractionValues = ['0', '25', '50', '75', '100'];
  const fractionWords = [' ', 'idea', 'purchased', 'wrapped', 'gifted'];
  const progressColor = status < 4 ? 'green' : 'gold';

  console.log('status ' + status);

  return (
    <ProgressCircle
      percent={Number(fractionValues[status])}
      radius={40}
      borderWidth={8}
      color={progressColor}
      shadowColor='#999'
      bgColor='#fff'
    >
      <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
        {fractionWords[status]}
      </Text>
    </ProgressCircle>
  );
};
const Recipients = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const recipientModal = (
    recipientName,
    recipientBudget,
    recipientDescription,
    recipientStatus,
    id,
    giftListId,
    recipientComplete
  ) => {
    //validates create form
    const [validate, setValidate] = useState(false);
    const [name, setName] = useState(recipientName);
    const [budget, setBudget] = useState(recipientBudget);
    const [description, setDescription] = useState(recipientDescription);
    const [status, setStatus] = useState(recipientStatus);
    const [completed, setCompleted] = useState(recipientComplete);

    let newStatus = status;
    let newComplete = completed;

    useEffect(() => {
      setName(recipientName);
      setBudget(recipientBudget);
      setDescription(recipientDescription);
      setStatus(recipientStatus);
      setCompleted(recipientComplete);
    }, [modal]);

    useEffect(() => {
      if (name.length > 0) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    }, [name]);

    const deletePerson = () => {
      dispatch(deleteRecipient(giftListId, id));
    };

    const submitPerson = () => {
      if (validate) {
        dispatch(
          editRecipient(
            giftListId,
            id,
            name,
            budget,
            description,
            newStatus,
            newComplete
          )
        );
        setModal(false);
      } else {
        Alert.alert('Alert', 'The person needs a name!', [{ text: 'OK' }]);
      }
    };

    return (
      <Modal
        visible={modal}
        onBackdropPress={() => {
          setModal(false);
        }}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: '#E5E5E5',
            height: '98%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: responsiveFontSize(2),
          }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
              }}
            >
              <FontAwesome5
                name='times'
                color={'black'}
                size={responsiveFontSize(3)}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.fieldTtitleText}>Name</Text>
          <View
            style={[
              styles.fieldContainer,
              { marginTop: responsiveFontSize(0.5) },
            ]}
          >
            <TextInput
              style={styles.textInputStyle}
              value={name}
              placeholderStyle={{ fontWeight: 'bold' }}
              placeholder='Who are you giving to?'
              onChangeText={(name) => setName(name)}
            ></TextInput>
          </View>
          <Text style={styles.fieldTtitleText}>BUDGET</Text>
          <View style={styles.fieldContainer}>
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
          <Text style={styles.fieldTtitleText}>Description</Text>
          <View style={styles.fieldContainer}>
            <View>
              <TextInput
                style={styles.descriptionInputStyle}
                multiline
                numberOfLines={5}
                value={description}
                placeholderStyle={{ fontWeight: 'bold' }}
                placeholder='What are you getting them?'
                onChangeText={(description) => setDescription(description)}
              ></TextInput>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fieldTtitleText}>Status</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: responsiveFontSize(2),
              backgroundColor: 'white',
              borderRadius: 20,
            }}
          >
            <ProgressSteps activeStep={newStatus} isComplete={newComplete}>
              <ProgressStep
                label='Idea'
                onNext={() => {
                  newStatus = 1;
                }}
              >
                <View style={{ alignItems: 'center' }}></View>
              </ProgressStep>
              <ProgressStep
                label='Purchased'
                previousBtnDisabled={true}
                onNext={() => {
                  newStatus = 2;
                }}
              ></ProgressStep>
              <ProgressStep
                label='Wrapped'
                onNext={() => {
                  newStatus = 3;
                }}
                onPrevious={() => {
                  newStatus = 1;
                }}
              ></ProgressStep>
              <ProgressStep
                label='Gifted!'
                onSubmit={() => {
                  newComplete = true;
                  setCompleted(true);
                }}
                onPrevious={() => {
                  newStatus = 2;
                  newComplete = false;
                  setCompleted(false);
                }}
              ></ProgressStep>
            </ProgressSteps>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CreateCancelButton
              label={'DELETE'}
              buttonColor={'#e30000'}
              onPress={() => {
                //deletePerson();
                Alert.alert(
                  'Delete',
                  'Are you sure that you want to delete this person?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => deletePerson(),
                    },
                  ]
                );
              }}
            />
            <CreateCancelButton
              label={'SUBMIT'}
              buttonColor={'#0300ef'}
              onPress={() => {
                submitPerson();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: responsiveFontSize(1),
        }}
        onPress={() => {
          setModal(true);
        }}
      >
        {recipientModal(
          props.name,
          props.budget,
          props.description,
          props.status,
          props.id,
          props.giftListId,
          props.completed
        )}
        <View
          style={{
            flexDirection: 'column',
            width: '75%',
          }}
        >
          <View style={styles.topContainer}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: responsiveFontSize(2),
                }}
              >
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>TO: </Text>
                {props.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '25%' }}>
              <Text numberOfLines={1} style={styles.nameText}>
                ${props.budget}
              </Text>
            </View>
            <View style={{ width: '75%' }}>
              <Text style={styles.nameText}>{props.description}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '25%', justifyContent: 'center' }}>
          {percentageCircleHelper(props.status, props.completed)}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    marginVertical: responsiveFontSize(0.2),
    paddingVertical: responsiveFontSize(1),
  },
  topContainer: {},
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
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
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
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  descriptionInputStyle: {
    width: '100%',
    height: responsiveFontSize(16),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
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
  fieldTtitleText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  fieldContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: responsiveFontSize(1),
  },
});

export default Recipients;
