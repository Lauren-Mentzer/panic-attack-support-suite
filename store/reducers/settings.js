import { SET_COLORS, SET_ENABLED, SET_EMERGENCY, SET_COLOR_PALETTE, SET_WALKTHROUGH } from '../actions/settings';

const initialState = {
  colors: {
    primary: '#05668d',
    shade1: '#028090',
    shade2: '#00a896',
    shade3: '#02c39a',
    secondary: '#f7f9dd',
    light: '#fbfcee',
    danger: '#b92e34',
  },
  colorPalette: 'Seafoam',
  enabled: {
    breathe: true,
    grounding: true,
    relax: true,
    reminders: true,
    communicate: true,
    contact: true,
  },
  emergencyInfo: true,
  walkthrough: {
    home: true,
    settings: true,
    emergency: true,
    emergencySettings: true,
    breathe: true,
    grounding: true,
    relax: true,
    reminders: true,
    remindersSettings: true,
    flashcards: true,
    chat: true,
    communicateSettings: true,
    contact: true,
    contactSettings: true,
  },
};

const settingsReducer = (state = initialState, action) => {
  let tempState;
  switch (action.type) {
    case SET_COLORS:
      return { ...state, colors: action.palette };
    case SET_COLOR_PALETTE:
      return { ...state, colorPalette: action.palette };
    case SET_ENABLED:
      tempState = { ...state.enabled };
      tempState[action.feature] = action.enabled;
      return { ...state, enabled: tempState };
    case SET_EMERGENCY:
      return { ...state, emergencyInfo: action.value };
    case SET_WALKTHROUGH:
      tempState = { ...state.walkthrough };
      if (action.key === null) {
        Object.keys(tempState).forEach((key) => {
          tempState[key] = action.value;
        });
        return { ...state, walkthrough: tempState };
      }
      tempState[action.key] = action.value;
      return { ...state, walkthrough: tempState };
    default:
      return state;
  }
};

export default settingsReducer;
