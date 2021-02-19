import { storeData } from '../../helpers/storage';
import { FLASHCARD_LIST } from '../../constants/keys';

export const SET_LIST = 'SET_LIST';

export const addCard = (text) => {
  return async (dispatch, getState) => {
    const currentList = getState().flashcards.list;
    const newList = currentList.concat([text]);
    await storeData(FLASHCARD_LIST, newList);
    dispatch(setList(newList));
  };
};

export const editCard = (index, text) => {
  return async (dispatch, getState) => {
    const currentList = getState().flashcards.list;
    currentList[index] = text;
    await storeData(FLASHCARD_LIST, currentList);
    dispatch(setList(currentList));
  };
};

export const removeCard = (index) => {
  return async (dispatch, getState) => {
    const currentList = getState().flashcards.list;
    currentList.splice(index, 1);
    await storeData(FLASHCARD_LIST, currentList);
    dispatch(setList(currentList));
  };
};

export const setList = (list) => {
  return {
    type: SET_LIST,
    list,
  };
};
