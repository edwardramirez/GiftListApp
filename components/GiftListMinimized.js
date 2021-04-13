import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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

const giftListMinimized = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const deleteList = (id) => dispatch(deleteGiftList(id));

  //shows edit and delete on card
  const [showSubMenu, setShowSubMenu] = useState(false);

  //Calculate completed. completed/total
  //calucate spent.  spent/totalBudget

  const closeSubMenu = () => {
    setShowSubMenu(false);
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
  var randomColor = require('randomcolor'); // import the script
  var color = randomColor(); // a hex code for an attractive color

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
            <View style={{ padding: responsiveFontSize(1) }}>
              <Text style={styles.titleText}>{props.focusedList.title}</Text>
            </View>
            <View style={{ padding: responsiveFontSize(1) }}>
              <Text style={styles.infoText}>
                Due in <Text style={{ color: 'red' }}>{diffDays}</Text> days!
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                padding: responsiveFontSize(1),
                //backgroundColor: 'red',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text>Completed</Text>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={8}
                  color='#3399FF'
                  shadowColor='#999'
                  bgColor='#fff'
                >
                  <Text style={{ fontSize: 18 }}>{'30%'}</Text>
                </ProgressCircle>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text>Spent</Text>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={8}
                  color='green'
                  shadowColor='#999'
                  bgColor='#fff'
                >
                  <Text style={{ fontSize: 18 }}>{'30%'}</Text>
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
                    focusedList: props.focusedList,
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
                  deleteList(props.focusedList.id);
                  setShowSubMenu(false);
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
    borderRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: responsiveFontSize(2),
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    color: 'black',
  },
  infoText: {
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveFontSize(1),
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
