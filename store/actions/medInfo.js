import { storeDataSafe } from '../../helpers/storage';

export const SAVE_INFO = 'SAVE_INFO';

export const saveInfo = (name, birthday, address, medications, medNotes, allergies) => {
  return async (dispatch) => {
    await storeDataSafe('name', name);
    await storeDataSafe('birthday', birthday);
    await storeDataSafe('address', address);
    await storeDataSafe('medications', medications);
    await storeDataSafe('medNotes', medNotes);
    await storeDataSafe('allergies', allergies);

    dispatch(saveInfoAction(name, birthday, address, medications, medNotes, allergies));
  };
};

export const saveInfoAction = (name, birthday, address, medications, medNotes, allergies) => {
  return {
    type: SAVE_INFO,
    name,
    birthday,
    address,
    medications,
    medNotes,
    allergies,
  };
};
