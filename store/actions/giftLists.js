export const ADD_GIFTLIST = 'ADD_GIFTLIST';
export const DELETE_GIFTLIST = 'DELETE_GIFTLIST';
export const ADD_RECIPIENT = 'ADD_RECIPIENT';
export const EDIT_GIFTLIST = 'EDIT_GIFTLIST';
export const DELETE_RECIPIENT = 'DELETE_RECIPIENT';
export const EDIT_RECIPIENT = 'EDIT_RECIPIENT';

export const addGiftList = (title, budget, date, recipients) => {
  return {
    type: ADD_GIFTLIST,
    giftListTitle: title,
    giftListBudget: budget,
    giftListDate: date,
    giftListRecipients: recipients,
  };
};

export const deleteGiftList = (key) => {
  return {
    type: DELETE_GIFTLIST,
    id: key,
  };
};

export const editGiftList = (key, title, budget, date, recipients) => {
  return {
    type: EDIT_GIFTLIST,
    giftListId: key,
    giftListTitle: title,
    giftListBudget: budget,
    giftListDate: date,
    giftListRecipients: recipients,
  };
};

export const addRecipient = (key, id, name, budget, description, status) => {
  return {
    type: ADD_RECIPIENT,
    giftListId: key,
    recipientId: id,
    recipientName: name,
    recipientBudget: budget,
    recipientDescription: description,
    recipientStatus: status,
  };
};
export const deleteRecipient = (giftListId, recipientId) => {
  return {
    type: DELETE_RECIPIENT,
    giftListId: giftListId,
    recipientId: recipientId,
  };
};
export const editRecipient = (key, id, name, budget, description, status) => {
  return {
    type: EDIT_RECIPIENT,
    giftListId: key,
    recipientId: id,
    recipientName: name,
    recipientBudget: budget,
    recipientDescription: description,
    recipientStatus: status,
  };
};
