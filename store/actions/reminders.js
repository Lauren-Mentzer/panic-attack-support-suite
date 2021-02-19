import { storeData } from '../../helpers/storage';
import { REMINDERS_LIST, AFFIRMATIONS_ENABLED, AFFIRMATIONS } from '../../constants/keys';

export const SET_POSITIVE_AFFIRMATIONS = 'SET_POSITIVE_AFFIRMATIONS';
export const ENABLE_AFFIRMATION = 'ENABLE_AFFIRMATION';
export const SET_LIST = 'SET_LIST';
export const POSITIVE_AFFIRMATIONS = [
  'This feeling is only temporary, and it will pass shortly',
  'I breathe in relaxation, and breathe out stress',
  'I am enough',
  "I've survived this before, I'll survive it now",
  'I replace fear with love',
  'I will be ok',
  'I am loved',
  'Tomorrow is a brand new day',
  'I am strong',
];

export const setPositiveAffirmationsAction = (value) => {
  return {
    type: SET_POSITIVE_AFFIRMATIONS,
    value,
  };
};

export const enableAffirmationAction = (index, value) => {
  return {
    type: ENABLE_AFFIRMATION,
    index,
    value,
  };
};

export const setPositiveAffirmations = (value) => {
  return (dispatch) => {
    storeData(AFFIRMATIONS_ENABLED, value);
    dispatch(setPositiveAffirmationsAction(value));
  };
};

export const enableAffirmation = (index, value) => {
  return (dispatch, getState) => {
    const currentAffirmations = { ...getState().reminders.affirmations };
    currentAffirmations[index] = value;
    storeData(AFFIRMATIONS, currentAffirmations);
    dispatch(enableAffirmationAction(index, value));
  };
};

export const addReminder = (text) => {
  return async (dispatch, getState) => {
    const currentList = getState().reminders.list;
    const newList = currentList.concat([text]);
    await storeData(REMINDERS_LIST, newList);
    dispatch(setRemindersList(newList));
  };
};

export const editReminder = (index, text) => {
  return async (dispatch, getState) => {
    const currentList = getState().reminders.list;
    currentList[index] = text;
    await storeData(REMINDERS_LIST, currentList);
    dispatch(setRemindersList(currentList));
  };
};

export const removeReminder = (index) => {
  return async (dispatch, getState) => {
    const currentList = getState().reminders.list;
    currentList.splice(index, 1);
    await storeData(REMINDERS_LIST, currentList);
    dispatch(setRemindersList(currentList));
  };
};

export const setRemindersList = (list) => {
  return {
    type: SET_LIST,
    list,
  };
};
