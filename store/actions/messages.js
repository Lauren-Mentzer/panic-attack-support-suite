export const SAVE_MESSAGE = 'SAVE_MESSAGE';

export const saveMessage = (message) => {
  return {
    type: SAVE_MESSAGE,
    message,
  };
};
