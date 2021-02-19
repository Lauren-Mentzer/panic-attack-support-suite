import { SAVE_MESSAGE } from '../actions/messages';

const initialState = {
  list: [],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MESSAGE:
      return { list: state.list.concat(action.message) };
    default:
      return state;
  }
};

export default messagesReducer;
