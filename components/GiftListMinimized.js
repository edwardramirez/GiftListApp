import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";

import { deleteGiftList } from "../store/actions/giftLists";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const giftListMinimized = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const deleteList = (id) => dispatch(deleteGiftList(id));

  //shows edit and delete on card
  const [showSubMenu, setShowSubMenu] = useState(false);

  const closeSubMenu = () => {
    setShowSubMenu(false);
  };

  //calculates difference remainder days
  let today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(
    Math.abs((today - props.focusedList.date) / oneDay)
  );

  var randomColor = require("randomcolor"); // import the script
  var color = randomColor(); // a hex code for an attractive color

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          navigation.navigate("Recipient Screen", {
            giftListID: props.focusedList.id,
            giftListTitle: props.focusedList.title,
            focusedList: props.focusedList.recipients,
          });
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: responsiveFontSize(2),
            }}
          >
            <FontAwesome5
              style={{ alignSelf: "center" }}
              name="gift"
              color={color}
              size={responsiveFontSize(4)}
            />
          </View>
          <View>
            <Text style={styles.titleText}>{props.focusedList.title}</Text>
            <Text style={styles.infoText}>Due in {diffDays} days!</Text>
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
            name="ellipsis-h"
            color={"black"}
            size={responsiveFontSize(4)}
          />

          <Modal
            style={{ alignItems: "center" }}
            isVisible={showSubMenu}
            onBackdropPress={closeSubMenu}
          >
            <View style={styles.subMenuContainer}>
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => {
                  navigation.navigate("Edit Screen", {
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
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    color: "black",
  },
  infoText: {
    //fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveFontSize(1),
    color: "black",
  },
  leftContainer: {
    flex: 1,
    paddingVertical: responsiveFontSize(1),
  },

  ellipsisContainer: {
    //backgroundColor: "red",
    height: "50%",
    paddingHorizontal: responsiveFontSize(2),
    paddingVertical: responsiveFontSize(1),
  },
  subMenuContainer: {
    height: responsiveScreenHeight(15),
    width: responsiveScreenWidth(60),
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  menuOptions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
  },

  touchableStyle: {
    flex: 1,
  },
});

export default giftListMinimized;
