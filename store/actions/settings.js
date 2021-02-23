import { storeData } from '../../helpers/storage';
import {
  COLOR_PALETTE,
  EMERGENCY_ENABLED,
  BREATHE_ENABLED,
  GROUNDING_ENABLED,
  RELAX_ENABLED,
  REMINDERS_ENABLED,
  COMMUNICATE_ENABLED,
  CONTACT_ENABLED,
} from '../../constants/keys';
import { Default, Green, Dusk, Greyscale, Dark } from '../../constants/colors';

// export const COLOR_PALETTES = ['Default', 'Green', 'Dusk', 'Greyscale', 'Dark'];
export const COLOR_PALETTES = ['Default'];

export const SET_COLORS = 'SET_COLORS';
export const SET_COLOR_PALETTE = 'SET_COLOR_PALETTE';
export const SET_ENABLED = 'SET_ENABLED';
export const SET_EMERGENCY = 'SET_EMERGENCY';

export const setColorPalette = (palette) => {
  return (dispatch) => {
    storeData(COLOR_PALETTE, palette);
    dispatch(setPalette(palette));
    let colors;
    switch (palette) {
      case COLOR_PALETTES[0]:
        colors = Default;
        break;
      case COLOR_PALETTES[1]:
        colors = Green;
        break;
      case COLOR_PALETTES[2]:
        colors = Dusk;
        break;
      case COLOR_PALETTES[3]:
        colors = Greyscale;
        break;
      case COLOR_PALETTES[4]:
        colors = Dark;
        break;
      default:
        colors = Default;
        break;
    }
    dispatch(setColors(colors));
  };
};

export const setEnabled = (feature, enabled) => {
  return (dispatch) => {
    let key;
    switch (feature) {
      case 'breathe':
        key = BREATHE_ENABLED;
        break;
      case 'grounding':
        key = GROUNDING_ENABLED;
        break;
      case 'relax':
        key = RELAX_ENABLED;
        break;
      case 'reminders':
        key = REMINDERS_ENABLED;
        break;
      case 'communicate':
        key = COMMUNICATE_ENABLED;
        break;
      case 'contact':
        key = CONTACT_ENABLED;
        break;
      default:
    }
    storeData(key, enabled);
    dispatch(setEnabledAction(feature, enabled));
  };
};

export const setEmergency = (value) => {
  return (dispatch) => {
    storeData(EMERGENCY_ENABLED, value);
    dispatch(setEmergencyAction(value));
  };
};

export const setColors = (palette) => {
  return {
    type: SET_COLORS,
    palette,
  };
};

export const setPalette = (palette) => {
  return {
    type: SET_COLOR_PALETTE,
    palette,
  };
};

export const setEnabledAction = (feature, enabled) => {
  return {
    type: SET_ENABLED,
    feature,
    enabled,
  };
};

export const setEmergencyAction = (value) => {
  return {
    type: SET_EMERGENCY,
    value,
  };
};
