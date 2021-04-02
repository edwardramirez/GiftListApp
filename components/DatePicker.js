import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Colors from "../resources/Colors";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

import { Calendar } from "react-native-calendars";

const convertDateFormat = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePicker = (props) => {
  const [getShowDatePicker, setShowDatePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const closeCalendar = () => {
    setShowDatePicker(false);
    setSelectedDate(props.date);
  };
  const applyCalendar = () => {
    setShowDatePicker(false);
    props.setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInputContainerWrapper}>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.dateText}>
            {months[props.date.getMonth()]} {props.date.getDate()},{" "}
            {props.date.getFullYear()}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.calendarTouchableContainer}>
              <View>
                <Text style={styles.calendarText}>CALENDAR</Text>
              </View>
              <View style={{ paddingRight: responsiveFontSize(2) }}>
                <FontAwesome5
                  name="calendar-alt"
                  color={"#2D8CE3"}
                  size={responsiveFontSize(5)}
                />
              </View>
            </View>

            <Modal
              animationIn="slideInUp"
              isVisible={getShowDatePicker}
              style={{ margin: 0 }}
              onBackdropPress={closeCalendar}
            >
              <View style={styles.dateCreatedModalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingLeft: responsiveFontSize(1),
                      }}
                    >
                      DUE DATE:
                    </Text>
                  </View>
                  <View style={styles.cancelButton}>
                    <TouchableOpacity onPress={closeCalendar}>
                      <FontAwesome5
                        name="times"
                        color={"black"}
                        size={responsiveFontSize(3)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.calendarContainer}>
                  <Calendar
                    theme={{
                      "stylesheet.calendar.basic": {},

                      dayTextColor: "#BDBDBD",
                      arrowColor: "#BDBDBD",
                      disabledArrowColor: "#BDBDBD",
                      monthTextColor: "#BDBDBD",
                      indicatorColor: "#BDBDBD",
                      textMonthFontWeight: "bold",
                      textDayFontWeight: "bold",
                      textDayHeaderFontWeight: "bold",
                      textMonthFontSize: responsiveFontSize(2),
                    }}
                    onDayPress={(date) => {
                      let currentTime = new Date();
                      let hour = currentTime.getHours();
                      let min = currentTime.getMinutes();
                      let sec = currentTime.getSeconds();
                      let milli = currentTime.getMilliseconds();

                      setSelectedDate(
                        new Date(
                          date.year,
                          date.month - 1,
                          date.day,
                          hour,
                          min,
                          sec,
                          milli
                        )
                      );
                    }}
                    markedDates={{
                      [convertDateFormat(selectedDate)]: {
                        selected: true,
                        selectedColor: "#60AEF6",
                      },
                    }}
                    monthFormat={"MMMM"}
                    enableSwipeMonths={true}
                  />
                </View>
                <View style={styles.applyContainer}>
                  <TouchableOpacity onPress={applyCalendar}>
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    justifyContent: "center",
    paddingVertical: responsiveFontSize(2),
  },
  textInputLabelContainer: {
    justifyContent: "flex-start",
  },
  textInputLabelText: {
    fontSize: responsiveFontSize(2),
    color: "#BDBDBD",
    fontWeight: "bold",
  },
  dateInputContainerWrapper: {
    alignItems: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    paddingHorizontal: responsiveFontSize(2),
    paddingBottom: responsiveFontSize(2),
  },
  dateCreatedModalContent: {
    paddingHorizontal: responsiveFontSize(2),
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  calendarContainer: {
    overflow: "hidden",
    paddingTop: responsiveScreenFontSize(2),
  },

  calendarText: {
    color: "#2D8CE3",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginRight: responsiveFontSize(1),
    paddingBottom: responsiveFontSize(2),
  },
  applyText: {
    color: "#2D8CE3",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  applyContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: responsiveFontSize(1),
    paddingTop: responsiveFontSize(2),
    paddingBottom: responsiveFontSize(1),
  },
  startToEndDateContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: responsiveFontSize(2),
    paddingLeft: responsiveFontSize(2),
  },
  startContainer: { alignItems: "flex-end" },
  calendarDateText: {
    marginLeft: responsiveFontSize(2),
    position: "absolute",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    alignContent: "center",
    justifyContent: "center",
  },
  cancelButton: {
    justifyContent: "center",
    paddingRight: responsiveFontSize(1),
    paddingTop: responsiveFontSize(1),
  },
  calendarTouchableContainer: {
    alignItems: "center",
  },

  dateBoarderContainer: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    height: responsiveFontSize(5),
    width: responsiveFontSize(21.5),
    marginRight: responsiveFontSize(2),
    paddingBottom: responsiveScreenFontSize(2),
    paddingTop: responsiveScreenFontSize(2),
    justifyContent: "center",
  },
});

export default DatePicker;
