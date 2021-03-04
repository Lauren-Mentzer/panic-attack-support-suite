import { SET_COLORS, SET_ENABLED, SET_EMERGENCY, SET_COLOR_PALETTE } from '../actions/settings';

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
    default:
      return state;
  }
};

export default settingsReducer;
