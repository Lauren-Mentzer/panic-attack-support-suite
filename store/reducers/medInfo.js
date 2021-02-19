import { SAVE_INFO } from '../actions/medInfo';

const initialState = {
  name: null,
  birthday: null,
  address: null,
  medications: null,
  medNotes: null,
  allergies: null,
};

const medInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INFO:
      return {
        ...state,
        name: action.name,
        birthday: action.birthday,
        address: action.address,
        medications: action.medications,
        medNotes: action.medNotes,
        allergies: action.allergies,
      };
    default:
      return state;
  }
};

export default medInfoReducer;
