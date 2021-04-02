import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";

import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import CurrencyInput from "react-native-currency-input";

import Colors from "../resources/Colors";
import CreateCancelButton from "./CreateCancelButton";

import giftRecipient from "../models/RecipientModel";

import { addRecipient } from "../store/actions/giftLists";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Recipients = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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

  //used to pass data to store
  const dispatch = useDispatch();

  //submits recipient
  const addRecipient = () => {
    console.log(newRecipient);
    dispatch(addRecipient(props.id, newRecipient));
    setShowSubMenu(false);
    // navigation.navigate("Main Screen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.recipientInfoContainer}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>
        <View style={styles.plusContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowSubMenu(true);
            }}
          >
            <FontAwesome5
              name="plus-square"
              color={"black"}
              size={responsiveFontSize(5)}
            />

            <Modal
              animationIn="slideInUp"
              isVisible={showSubMenu}
              style={{ margin: 0 }}
              onBackdropPress={closeSubMenu}
            >
              <View style={styles.createRecipientContainer}>
                <View style={styles.formContainer}>
                  <View>
                    <Text style={styles.titleTextStyle}>Name</Text>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderStyle={{ fontWeight: "bold" }}
                      placeholder="To"
                      value={name}
                      onChangeText={(name) => setName(name)}
                    />
                  </View>
                  <View>
                    <Text style={styles.titleTextStyle}>Price</Text>
                    <CurrencyInput
                      style={styles.textInputStyle}
                      value={price}
                      onChangeValue={setPrice}
                      placeholder="$0.00"
                      unit="$"
                      delimiter=","
                      separator="."
                      precision={2}
                    />
                    <Text style={styles.titleTextStyle}>Description</Text>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderStyle={{ fontWeight: "bold" }}
                      placeholder="Gift"
                      value={description}
                      onChangeText={(description) =>
                        setDescription(description)
                      }
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <CreateCancelButton
                    buttonColor="red"
                    buttonName="Cancel"
                    onPress={closeSubMenu}
                  />
                  <CreateCancelButton
                    buttonColor="blue"
                    buttonName="Add"
                    onPress={addRecipient}
                  />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{ flex: 1.5 }}
        onPress={() => {
          console.log("status");
        }}
      >
        <View style={styles.bottomContainer}>
          <ProgressSteps
            topOffset={0}
            marginBottom={0}
            labelFontSize={responsiveFontSize(1.5)}
          >
            <ProgressStep label="Purchased" removeBtnRow></ProgressStep>
            <ProgressStep label="Wrapped">
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 2!</Text>
              </View>
            </ProgressStep>
            <ProgressStep label="Delivered">
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveFontSize(20),
    width: "100%",
    borderRadius: 10,
    elevation: 10,
    marginVertical: responsiveFontSize(2),
    backgroundColor: "#177ae8",
    overflow: "hidden",
  },
  topContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: { flex: 1.5, backgroundColor: "white" },

  plusContainer: {
    justifyContent: "center",
    paddingHorizontal: responsiveFontSize(1),
    backgroundColor: "red",
  },

  nameText: {
    paddingTop: responsiveFontSize(1),
    paddingLeft: responsiveFontSize(1),
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  descriptionText: {
    color: "white",
    // backgroundColor: "green",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    alignItems: "center",
  },
  createRecipientContainer: {
    height: responsiveScreenHeight(65),
    backgroundColor: "white",
  },
  textInputStyle: {
    width: "100%",
    height: responsiveFontSize(8),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  descriptionInputStyle: {
    width: "100%",
    height: responsiveFontSize(16),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  titleTextStyle: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(5),
    paddingTop: responsiveFontSize(2),
  },
  formContainer: {
    paddingHorizontal: responsiveFontSize(2),
    paddingTop: responsiveFontSize(2),
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
});

export default Recipients;
