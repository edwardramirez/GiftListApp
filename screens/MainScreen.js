import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import GiftListMinimized from "../components/GiftListMinimized";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MainScreen = () => {
  const navigation = useNavigation();

  //returns all gift lists
  const availableGiftList = useSelector((state) => {
    return state.giftListReducer.giftList;
  });

  const renderGiftList = (itemData) => {
    return (
      <View style={styles.renderedGiftListStyle}>
        <GiftListMinimized
          key={itemData.item.id.toString()}
          focusedList={itemData.item}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{}}>
          <Text style={styles.headerText}>My giftlist!</Text>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={availableGiftList}
          renderItem={renderGiftList}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noListContainer}>
              <Text style={styles.noListText}>
                Tap add button to create Gift List!
              </Text>
            </View>
          }
        />
      </View>

      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create Screen");
          }}
        >
          <FontAwesome5
            name="plus-circle"
            color={"black"}
            size={responsiveFontSize(7)}
          />
        </TouchableOpacity>
      </View>
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
    alignItems: "flex-end",
    flexDirection: "row",
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    paddingHorizontal: responsiveFontSize(2),
  },
  flatListContainer: {
    flex: 1,
    // alignItems: "center",
    // padding: responsiveFontSize(2),
  },

  listContainer: {
    paddingVertical: responsiveFontSize(2),
  },

  addButton: {
    //backgroundColor: "red",
    elevation: 5,
    alignItems: "flex-end",
    position: "relative",
    paddingHorizontal: responsiveFontSize(20),

    bottom: 0,
    right: 0,
  },
  renderedGiftListStyle: { marginBottom: responsiveFontSize(2) },
  noListContainer: {
    paddingTop: responsiveFontSize(30),
    alignItems: "center",
  },
  noListText: { fontSize: responsiveFontSize(2) },
});

export default MainScreen;
