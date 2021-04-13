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

import { responsiveFontSize } from 'react-native-responsive-dimensions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Recipients from '../components/RecipientListMinimized';

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

  //console.log(list);

  const renderRecipientList = (itemData) => {
    return (
      <View style={styles.renderedGiftListStyle}>
        <Recipients
          name={itemData.item.name}
          budget={itemData.item.budget}
          description={itemData.item.description}
        />
      </View>
    );
  };

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
              name='arrow-left'
              color={'white'}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headTextContainer}>
          <Text style={styles.headerText}>{list.title}</Text>
        </View>
      </View>

      <View style={styles.recipientContianer}>
        <FlatList
          data={list.recipients}
          renderItem={renderRecipientList}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Add Person Screen', { id: giftListId });
          }}
        >
          <FontAwesome5
            name='plus-circle'
            color={'black'}
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
  listContainer: {
    padding: responsiveFontSize(2),
  },
  addButton: {
    //backgroundColor: "red",
    elevation: 5,
    alignItems: 'flex-end',
    position: 'relative',
    paddingHorizontal: responsiveFontSize(20),

    bottom: 0,
    right: 0,
  },
});

export default RecepientScreen;
