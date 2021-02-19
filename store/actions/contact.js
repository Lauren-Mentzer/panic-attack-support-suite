import { CONTACT_1, CONTACT_2 } from '../../constants/keys';
import { storeData } from '../../helpers/storage';

export const SET_CONTACTS = 'SET_CONTACTS';

export const editContact = (contact1, contact2) => {
  return (dispatch) => {
    if (contact1) {
      storeData(CONTACT_1, contact1);
    }
    if (contact2) {
      storeData(CONTACT_2, contact2);
    }
    dispatch(setContacts(contact1, contact2));
  };
};

export const setContacts = (contact1, contact2) => {
  return {
    type: SET_CONTACTS,
    contact1,
    contact2,
  };
};
