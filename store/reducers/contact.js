import { SET_CONTACTS } from '../actions/contact';

const initialState = {
  contact1: {
    nickname: '',
    phone: null,
    message: '',
  },
  contact2: {
    nickname: '',
    phone: null,
    message: '',
  },
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        contact1: action.contact1 ? action.contact1 : state.contact1,
        contact2: action.contact2 ? action.contact2 : state.contact2,
      };
    default:
      return state;
  }
};

export default contactReducer;
