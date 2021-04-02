import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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
  };

  //validates create form
  const [validate, setValidate] = useState(null);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topSafeAreaView}>
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
            <Text style={styles.headerText}>Edit Gift List</Text>
          </View>
        </View>
        <View style={styles.scrollViewContainer}>
          <View style={styles.formContainer}>
            <View style={styles.fieldTitle}>
              <Text style={styles.fieldTtitleText}>TITLE</Text>
              <TextInput
                style={styles.textInputStyle}
                value={title}
                placeholderStyle={{ fontWeight: "bold" }}
                placeholder="List Title"
                onChangeText={(title) => setTitle(title)}
              ></TextInput>
            </View>
            <View style={styles.budgetContainer}>
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
            <View style={styles.dateContainer}>
              <Text style={styles.fieldTtitleText}>DUE DATE</Text>
              <DatePicker label="Date" date={date} setDate={setDate} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <AcceptButton
              buttonName="SAVE"
              onPress={() => {
                submitEditGiftList();
                props.navigation.goBack();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  topSafeAreaView: { flex: 1, overflow: "hidden" },
  scrollViewContainer: {
    flex: 1,
  },
  headerContainer: {
    elevation: 5,
    borderRadius: 5,
    height: responsiveFontSize(15),
    backgroundColor: "pink",
    flexDirection: "row",
  },
  arrowContainer: { justifyContent: "flex-end" },
  textContainer: {
    justifyContent: "flex-end",
  },
  arrow: { padding: responsiveFontSize(2) },
  headerText: {
    fontSize: responsiveFontSize(5),
    paddingTop: 50,
    fontWeight: "bold",
  },
  formContainer: {
    paddingHorizontal: responsiveFontSize(2),
    paddingTop: responsiveFontSize(2),
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
    paddingTop: responsiveFontSize(2),
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    padding: responsiveFontSize(2),
    width: "100%",
  },
});

export default EditScreen;
