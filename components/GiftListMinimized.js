import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

import { useNavigation } from '@react-navigation/native';

import { deleteGiftList } from '../store/actions/giftLists';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import ProgressCircle from 'react-native-progress-circle';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const giftListMinimized = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  //shows edit and delete on card
  const [showSubMenu, setShowSubMenu] = useState(false);

  //Calculate completed. completed/total
  //calucate spent.  spent/totalBudget

  const closeSubMenu = () => {
    setShowSubMenu(false);
  };

  const deleteList = () => {
    dispatch(deleteGiftList(props.focusedList.id));
  };

  //calculates difference remainder days
  let today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  let diffDays;
  if (new Date(props.focusedList.date) < today) {
    diffDays = diffDays = Math.round(
      Math.abs((today - new Date(props.focusedList.date)) / oneDay)
    );
  } else {
    diffDays = Math.round(
      Math.abs((today - new Date(props.focusedList.date)) / oneDay)
    );
  }

  let pass = new Date(props.focusedList.date) > today ? true : false;

  let month = new Date(props.focusedList.date).getMonth();
  let day = new Date(props.focusedList.date).getDay();
  let year = new Date(props.focusedList.date).getFullYear();

  var randomColor = require('randomcolor'); // import the script
  var color = randomColor(); // a hex code for an attractive color

  let total = props.focusedList.recipients?.reduce(
    (acc, el) => acc + el.budget,
    0
  );

  let budget = props.focusedList.budget;

  let currentTotal =
    props.focusedList.budget > 0 ? (currentTotal = 100 * (total / budget)) : 0;

  let spentCircleColor = currentTotal > 100 ? 'red' : 'green';

  //can't divide by zero
  let amountOfRecipients = props.focusedList.recipients.length;

  let completed = props.focusedList.recipients?.reduce(
    (acc, el) => acc + (Number(el.status) + 1) / 4,
    0
  );
  let currentCompleted =
    amountOfRecipients >= 0 ? 100 * (completed / amountOfRecipients) : 0;

  if (Math.round(currentCompleted) !== currentCompleted) {
    currentCompleted = currentCompleted.toFixed(2);
  }

  if (Math.round(completed) !== completed) {
    completed = completed.toFixed(2);
  }

  const progressColor =
    currentCompleted / amountOfRecipients !== 1 ? '#3399FF' : 'gold';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          navigation.navigate('Recipient Screen', {
            giftListID: props.focusedList.id,
          });
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: responsiveFontSize(2),
            }}
          >
            <FontAwesome5
              style={{ alignSelf: 'center' }}
              name='gift'
              color={color}
              size={responsiveFontSize(4)}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View style={{ paddingBottom: responsiveFontSize(1) }}>
              <Text style={styles.titleText}>{props.focusedList.title}</Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
              {pass ? (
                <Text style={styles.infoText}>
                  Due in <Text style={{ color: 'red' }}>{diffDays}</Text> days!
                </Text>
              ) : (
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  {months[month]}, {day} {year}
                </Text>
              )}
            </View>
            <View
              style={{
                paddingBottom: responsiveFontSize(1),
              }}
            >
              {/* <Text style={styles.infoText}>
                Budget: ${props.focusedList.budget}
              </Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',

                //backgroundColor: 'red',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={{ paddingBottom: responsiveFontSize(0.5) }}>
                  Completed
                </Text>
                <ProgressCircle
                  percent={Number(currentCompleted)}
                  radius={50}
                  borderWidth={8}
                  color={progressColor}
                  shadowColor='#999'
                  bgColor='#fff'
                >
                  {amountOfRecipients > 0 ? (
                    <View style={{ alignItems: 'center' }}>
                      <Text>{completed}</Text>
                      <Text style={{ fontWeight: 'bold' }}>out of</Text>
                      <Text style={{ fontSize: 18 }}>{amountOfRecipients}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>add people!</Text>
                    </View>
                  )}
                </ProgressCircle>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ paddingBottom: responsiveFontSize(0.5) }}>
                  Spent
                </Text>
                <ProgressCircle
                  percent={Number(currentTotal)}
                  radius={50}
                  borderWidth={8}
                  color={spentCircleColor}
                  shadowColor='#999'
                  bgColor='#fff'
                >
                  <Text>${currentTotal * 10}</Text>
                  <Text style={{ fontWeight: 'bold' }}>out of</Text>
                  <Text style={{ fontSize: 18 }}>${budget}</Text>
                </ProgressCircle>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.ellipsisContainer}>
        <TouchableOpacity
          onPress={() => {
            setShowSubMenu(true);
          }}
        >
          <FontAwesome5
            name='ellipsis-h'
            color={'black'}
            size={responsiveFontSize(4)}
          />

          <Modal
            style={{ alignItems: 'center' }}
            isVisible={showSubMenu}
            onBackdropPress={closeSubMenu}
          >
            <View style={styles.subMenuContainer}>
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => {
                  navigation.navigate('Edit Screen', {
                    giftListId: props.focusedList.id,
                    recipientTitle: props.focusedList.title,
                    recipientDate: String(props.focusedList.date),
                    recipientBudget: props.focusedList.budget,
                    recipients: props.focusedList.recipients,
                  });
                  closeSubMenu();
                }}
              >
                <View style={styles.menuOptions}>
                  <Text>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => {
                  Alert.alert(
                    'Delete',
                    'Are you sure that you want to delete this list?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          deleteList();
                        },
                      },
                    ]
                  );
                }}
              >
                <View style={styles.menuOptions}>
                  <Text>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: responsiveFontSize(0.5),
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    color: 'black',
  },
  infoText: {
    fontWeight: '800',
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  leftContainer: {
    flex: 1,
    paddingVertical: responsiveFontSize(1),
    flexDirection: 'column',
  },

  ellipsisContainer: {
    //backgroundColor: "red",
    height: '50%',
    paddingHorizontal: responsiveFontSize(2),
    paddingVertical: responsiveFontSize(1),
  },
  subMenuContainer: {
    height: responsiveScreenHeight(15),
    width: responsiveScreenWidth(60),
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuOptions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },

  touchableStyle: {
    flex: 1,
  },
});

export default giftListMinimized;
