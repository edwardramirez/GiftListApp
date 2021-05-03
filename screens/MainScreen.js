import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import GiftListMinimized from '../components/GiftListMinimized';
import CreateCancelButton from './../components/CreateCancelButton';

const MainScreen = () => {
  const navigation = useNavigation();

  let today = new Date();
  today.setHours(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  //returns all gift lists
  const availableGiftList = useSelector((state) => {
    return state.giftListReducer.giftList.filter(
      (current) => new Date(current.date) >= today
    );
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
        <CreateCancelButton
          label={'CREATE'}
          buttonColor={'black'}
          onPress={() => {
            navigation.navigate('Create Screen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  flatListContainer: {
    // alignItems: "center",
  },

  listContainer: {
    paddingBottom: responsiveFontSize(10),
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    bottom: 18,
    width: '100%',
    paddingHorizontal: responsiveFontSize(2),
  },
  renderedGiftListStyle: { marginBottom: responsiveFontSize(0.5) },
  noListContainer: {
    paddingTop: responsiveFontSize(30),
    alignItems: 'center',
  },
  noListText: { fontSize: responsiveFontSize(2) },
});

export default MainScreen;
