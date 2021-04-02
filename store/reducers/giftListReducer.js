import {
  ADD_GIFTLIST,
  EDIT_GIFTLIST,
  DELETE_GIFTLIST,
  ADD_RECIPIENT,
  EDIT_RECIPIENT,
} from "../actions/giftLists";

const initialState = {
  giftList: [],
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

    case ADD_RECIPIENT:
      //get giftList data
      const addGiftListId = action.giftListId;

      const recipient = action.giftListRecipients;

      //get giftlists
      const giftListEdit = [...state.giftList];

      // find giftlist index that we are going to edit
      const targetGiftListIndexAddRecipient = state.giftList.findIndex(
        (list) => {
          return list.id === addGiftListId;
        }
      );
      const newRecipientList =
        giftListEdit[targetGiftListIndexAddRecipient].recipients;

      newRecipientList.push(recipient);

      console.log(giftListEdit);

      return {
        ...state,
        giftList: giftListEdit,
      };
    default:
      return { ...state };
  }
};

export default giftListReuducer;
