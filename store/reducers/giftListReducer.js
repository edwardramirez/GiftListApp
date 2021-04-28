import {
  ADD_GIFTLIST,
  EDIT_GIFTLIST,
  DELETE_GIFTLIST,
  ADD_RECIPIENT,
  EDIT_RECIPIENT,
  DELETE_RECIPIENT,
} from '../actions/giftLists';

import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  giftList: [
    {
      budget: 50,
      date: 'Sat Feb 20 2021 11:30:58 GMT-0700 (PDT)',
      id: 0.17817645172513152,
      recipients: [
        {
          budget: 50,
          description: 'A crazy thing',
          id: 0.9948358305588771,
          name: 'Edward',
          status: 2,
        },
      ],
      title: 'This is a test',
    },

    {
      budget: 1000,
      date: 'Sat Dec 20 2021 11:30:58 GMT-0700 (PDT)',
      id: 5,
      recipients: [
        {
          budget: 50,
          description:
            'Im thinking getting this person something really really long and this is a long text',
          id: 1,
          name: 'Bob',
          status: 0,
        },
        // {
        //   budget: 100,
        //   description: 'Nike shoes',
        //   id: 2,
        //   name: 'Bill',
        //   status: 1,
        // },
        // {
        //   budget: 500,
        //   description: 'A ps5',
        //   id: 3,
        //   name: 'Edward',
        //   status: 3,
        // },
      ],
      title: 'Christmas',
    },
  ],
};

const giftListReuducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GIFTLIST:
      return {
        ...state,
        giftList: state.giftList.concat({
          id: Math.random(),
          title: action.giftListTitle,
          budget: action.giftListBudget,
          date: action.giftListDate,
          recipients: action.giftListRecipients,
        }),
      };

    case DELETE_GIFTLIST:
      return {
        ...state,
        giftList: state.giftList.filter((item) => item.id !== action.id),
      };

    case EDIT_GIFTLIST:
      //get giftList data
      const id = action.giftListId;

      //get giftlists
      const list = [...state.giftList];

      // find giftlist index that we are going to edit
      const targetGiftListIndex = state.giftList.findIndex((list) => {
        return list.id === id;
      });

      //new giftList object that will replace the edited giftList
      let newGiftList = {
        id: Math.random(),
        title: action.giftListTitle,
        budget: action.giftListBudget,
        date: action.giftListDate,
        recipients: action.giftListRecipients,
      };

      //replace item in array
      if (targetGiftListIndex >= 0) {
        list.splice(targetGiftListIndex, 1, newGiftList);
      }

      return {
        ...state,
        giftList: list,
      };

    case DELETE_RECIPIENT:
      //get giftlists
      const cloneList = cloneDeep([...state.giftList]);

      let targetListIndex = state.giftList.findIndex(
        (item) => item.id == action.giftListId
      );

      let newRecipientListToDelete = cloneList[
        targetListIndex
      ].recipients.filter((item) => item.id !== action.recipientId);

      cloneList[targetListIndex].recipients = newRecipientListToDelete;

      return {
        ...state,
        giftList: cloneList,
      };

    case EDIT_RECIPIENT:
      let editGiftListID = action.giftListId;

      //get giftlists
      const giftListEditRecipient = cloneDeep([...state.giftList]);

      let editRecipient = {
        id: action.recipientId,
        name: action.recipientName,
        budget: action.recipientBudget,
        description: action.recipientDescription,
        status: action.recipientStatus,
      };

      const targetGiftListIndexEditRecipient = state.giftList.findIndex(
        (list) => {
          return list.id === editGiftListID;
        }
      );

      const editRecipientList =
        giftListEditRecipient[targetGiftListIndexEditRecipient].recipients;

      const recipientIndex = editRecipientList.findIndex((list) => {
        return list.id === action.recipientId;
      });

      editRecipientList.splice(recipientIndex, 1, editRecipient);

      return { ...state, giftList: giftListEditRecipient };

    case ADD_RECIPIENT:
      //get giftList data
      const addGiftListId = action.giftListId;

      let newRecipient = {
        id: action.recipientId,
        name: action.recipientName,
        budget: action.recipientBudget,
        description: action.recipientDescription,
        status: action.recipientStatus,
      };

      //get giftlists
      const giftListEdit = cloneDeep([...state.giftList]);

      // find giftlist index that we are going to edit
      const targetGiftListIndexAddRecipient = state.giftList.findIndex(
        (list) => {
          return list.id === addGiftListId;
        }
      );
      const newRecipientList =
        giftListEdit[targetGiftListIndexAddRecipient].recipients;

      newRecipientList.push(newRecipient);
      return {
        ...state,
        giftList: giftListEdit,
      };
    default:
      return { ...state };
  }
};

export default giftListReuducer;
