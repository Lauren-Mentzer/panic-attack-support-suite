import { SET_LIST, SET_POSITIVE_AFFIRMATIONS, ENABLE_AFFIRMATION } from '../actions/reminders';

const initialState = {
  enablePositiveAffirmations: true,
  list: [
    'Take meds',
    'Get a drink of water',
    'Put in earplugs',
    'Find someplace dark and quiet',
    'Hug a stuffed animal',
    'Play with a pet',
    'Eat some food',
  ],
  affirmations: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
};

const remindersReducer = (state = initialState, action) => {
  let tempValue;
  switch (action.type) {
    case SET_LIST:
      return { ...state, list: action.list };
    case SET_POSITIVE_AFFIRMATIONS:
      return { ...state, enablePositiveAffirmations: action.value };
    case ENABLE_AFFIRMATION:
      tempValue = { ...state.affirmations };
      tempValue[action.index] = action.value;
      return { ...state, affirmations: tempValue };
    default:
      return state;
  }
};

export default remindersReducer;
