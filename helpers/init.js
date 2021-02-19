import {
  COLOR_PALETTE,
  CONTACT_1,
  CONTACT_2,
  FLASHCARD_LIST,
  REMINDERS_LIST,
  AFFIRMATIONS,
  AFFIRMATIONS_ENABLED,
  EMERGENCY_ENABLED,
  SHAKE_ENABLED,
  BREATHE_ENABLED,
  GROUNDING_ENABLED,
  RELAX_ENABLED,
  REMINDERS_ENABLED,
  COMMUNICATE_ENABLED,
  CONTACT_ENABLED,
} from '../constants/keys';
import { setContacts } from '../store/actions/contact';
import { setColorPalette, setShakeAction, setEmergencyAction, setEnabledAction } from '../store/actions/settings';
import { setList } from '../store/actions/flashcards';
import { setRemindersList, setPositiveAffirmationsAction, enableAffirmationAction } from '../store/actions/reminders';
import { saveInfoAction } from '../store/actions/medInfo';
import { getAllData, getDataSafe } from './storage';

const init = () => {
  return async (dispatch) => {
    const data = await getAllData();
    let tempValue;
    if (data && data.length) {
      data.forEach((pair) => {
        switch (pair[0]) {
          case FLASHCARD_LIST:
            dispatch(setList(JSON.parse(pair[1])));
            break;
          case CONTACT_1:
            dispatch(setContacts(JSON.parse(pair[1]), null));
            break;
          case CONTACT_2:
            dispatch(setContacts(null, JSON.parse(pair[1])));
            break;
          case COLOR_PALETTE:
            dispatch(setColorPalette(JSON.parse(pair[1])));
            break;
          case EMERGENCY_ENABLED:
            dispatch(setEmergencyAction(JSON.parse(pair[1])));
            break;
          case SHAKE_ENABLED:
            dispatch(setShakeAction(JSON.parse(pair[1])));
            break;
          case BREATHE_ENABLED:
            dispatch(setEnabledAction('breathe', JSON.parse(pair[1])));
            break;
          case GROUNDING_ENABLED:
            dispatch(setEnabledAction('grounding', JSON.parse(pair[1])));
            break;
          case RELAX_ENABLED:
            dispatch(setEnabledAction('relax', JSON.parse(pair[1])));
            break;
          case REMINDERS_ENABLED:
            dispatch(setEnabledAction('reminders', JSON.parse(pair[1])));
            break;
          case COMMUNICATE_ENABLED:
            dispatch(setEnabledAction('communicate', JSON.parse(pair[1])));
            break;
          case CONTACT_ENABLED:
            dispatch(setEnabledAction('contact', JSON.parse(pair[1])));
            break;
          case REMINDERS_LIST:
            dispatch(setRemindersList(JSON.parse(pair[1])));
            break;
          case AFFIRMATIONS:
            tempValue = JSON.parse(pair[1]);
            Object.keys(tempValue).forEach((key) => {
              dispatch(enableAffirmationAction(key, tempValue[key]));
            });
            break;
          case AFFIRMATIONS_ENABLED:
            dispatch(setPositiveAffirmationsAction(JSON.parse(pair[1])));
            break;
          default:
        }
      });
    }
    const name = await getDataSafe('name');
    const birthday = await getDataSafe('birthday');
    const address = await getDataSafe('address');
    const medications = await getDataSafe('medications');
    const medNotes = await getDataSafe('medNotes');
    const allergies = await getDataSafe('allergies');

    dispatch(saveInfoAction(name, birthday, address, medications, medNotes, allergies));
  };
};

export default init;
