import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";

import CurrencyInput from "react-native-currency-input";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../resources/Colors";

import AcceptButton from "../components/AcceptButton";

import { addRecipient } from "../store/actions/giftLists";

import giftRecipient from "../models/RecipientModel";

const CreateScreen = (props) => {
  let giftListId = props.route.params.id;
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  //used to pass data to store
  const dispatch = useDispatch();

  const newRecipient = new giftRecipient();
  newRecipient.id = Math.random();
  newRecipient.name = name;
  newRecipient.budget = budget;
  newRecipient.description = description;
  newRecipient.status = "";

  //submits recipient
  const submitAddRecipient = () => {
    dispatch(addRecipient(giftListId, newRecipient));
    props.navigation.goBack();
  };

  //validates create form
  const [validate, setValidate] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesome5
              style={styles.arrow}
              name="arrow-left"
              color={"black"}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Add a person!</Text>
        </View>
      </View>
      <ScrollView style={{}}>
        <View
          style={[styles.fieldContainer, { marginTop: responsiveFontSize(2) }]}
        >
          <Text style={styles.fieldTtitleText}>Name</Text>
          <TextInput
            style={styles.textInputStyle}
            value={name}
            placeholderStyle={{ fontWeight: "bold" }}
            placeholder="Who are you giving to?"
            onChangeText={(name) => setName(name)}
          ></TextInput>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>BUDGET</Text>
          <CurrencyInput
            style={styles.textInputStyle}
            value={budget}
            onChangeValue={setBudget}
            placeholder="How much do you plan to spend?"
            unit="$"
            delimiter=","
            separator="."
            precision={2}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>Description</Text>
          <View>
            <TextInput
              style={styles.descriptionInputStyle}
              multiline
              numberOfLines={5}
              value={description}
              placeholderStyle={{ fontWeight: "bold" }}
              placeholder="What are you getting them?"
              onChangeText={(description) => setDescription(description)}
            ></TextInput>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AcceptButton buttonName="ADD" onPress={submitAddRecipient} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  headerContainer: {
    height: responsiveFontSize(15),
    backgroundColor: "#E5E5E5",
    flexDirection: "row",
  },
  arrowContainer: { justifyContent: "flex-end" },
  textContainer: {
    justifyContent: "flex-end",
  },
  arrow: {
    padding: responsiveFontSize(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    paddingTop: 50,
    fontWeight: "bold",
  },

  textInputStyle: {
    height: responsiveFontSize(8),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  descriptionInputStyle: {
    height: responsiveFontSize(20),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  fieldTtitleText: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(5),
  },
  buttonContainer: {
    marginBottom: responsiveFontSize(2),
    paddingBottom: responsiveFontSize(2),
    marginHorizontal: responsiveFontSize(2),
  },
  fieldContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    padding: responsiveFontSize(2),
    marginBottom: responsiveFontSize(2),
    marginHorizontal: responsiveFontSize(2),
  },
});

export default CreateScreen;
