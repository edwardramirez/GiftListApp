import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Recipients from '../components/RecipientListMinimized';

import Header from '../components/Header';
import CreateCancelButton from './../components/CreateCancelButton';

const RecepientScreen = (props) => {
  //selected giftlist ID
  const giftListId = props.route.params.giftListID;
  //const giftListRecipients = props.route.params.focusedList;

  //returns all current list
  const list = useSelector((state) => {
    return state.giftListReducer.giftList.find(
      (current) => current.id === giftListId
    );
  });

  const renderRecipientList = (itemData) => {
    return (
      <View style={styles.renderedGiftListStyle}>
        <Recipients
          name={itemData.item.name}
          budget={itemData.item.budget}
          description={itemData.item.description}
          status={itemData.item.status}
          id={itemData.item.id}
          giftListId={giftListId}
          completed={itemData.item.completed}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ Flex: 1 }}>
        <Header
          label={'test'}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>

      <View style={styles.recipientContianer}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={list.recipients}
          renderItem={renderRecipientList}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noListContainer}>
              <Text style={styles.noListText}>
                Tap add button to add People!
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
            props.navigation.navigate('Add Person Screen', { id: giftListId });
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
  headerContainer: {
    height: responsiveFontSize(15),
    backgroundColor: '#923ac5',
    alignItems: 'flex-end',
    flexDirection: 'row',
    borderRadius: responsiveFontSize(2),
    padding: responsiveFontSize(1),
  },
  headTextContainer: {
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    color: 'white',
  },
  arrowContainer: { justifyContent: 'flex-end' },
  arrow: { padding: responsiveFontSize(2) },
  recipientContianer: { flex: 1 },
  listContainer: { paddingBottom: responsiveFontSize(10) },
  addButton: {
    flex: 1,
    position: 'absolute',
    bottom: 18,
    width: '100%',
    paddingHorizontal: responsiveFontSize(2),
  },
  noListContainer: {
    flex: 1,
    paddingTop: responsiveFontSize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noListText: { fontSize: responsiveFontSize(2) },
});

export default RecepientScreen;
