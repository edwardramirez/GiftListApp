import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";

import CurrencyInput from "react-native-currency-input";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../resources/Colors";

import DatePicker from "../components/DatePicker";
import AcceptButton from "../components/AcceptButton";

import { editGiftList } from "../store/actions/giftLists";

const EditScreen = (props) => {
  const id = props.route.params.focusedList.id;

  const [title, setTitle] = useState(props.route.params.focusedList.title);
  const [date, setDate] = useState(
    new Date(props.route.params.focusedList.date.toString())
  );
  const [budget, setBudget] = useState(props.route.params.focusedList.budget);

  //used to pass data to store
  const dispatch = useDispatch();

  const submitEditGiftList = () => {
    dispatch(
      editGiftList(
        id,
        title,
        budget,
        date,
        props.route.params.focusedList.recipients
      )
    );
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
          <Text style={styles.headerText}>Edit giftlist</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={[styles.fieldContainer, { marginTop: responsiveFontSize(2) }]}
        >
          <Text style={styles.fieldTtitleText}>TITLE</Text>
          <TextInput
            style={styles.textInputStyle}
            value={title}
            placeholderStyle={{ fontWeight: "bold" }}
            placeholder="List Title"
            onChangeText={(title) => setTitle(title)}
          ></TextInput>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>BUDGET</Text>
          <CurrencyInput
            style={styles.textInputStyle}
            value={budget}
            onChangeValue={setBudget}
            placeholder="$0.00"
            unit="$"
            delimiter=","
            separator="."
            precision={2}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTtitleText}>DUE DATE</Text>
          <DatePicker label="Date" date={date} setDate={setDate} />
        </View>
        <View style={styles.buttonContainer}>
          <AcceptButton buttonName="EDIT" onPress={submitEditGiftList} />
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
    width: "100%",
    height: responsiveFontSize(8),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey,
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
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

export default EditScreen;
