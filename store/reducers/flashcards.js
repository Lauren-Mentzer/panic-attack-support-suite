import { SET_LIST } from '../actions/flashcards';

const initialState = {
  list: [
    "Hello, I'm currently having a panic attack and can't speak. Super sorry to bother you ahhhh",
    'Is there somewhere I could get some cold water?',
    'Do you know of anywhere quiet nearby that I could go to? Sensory issues make it worse for me.',
    'I dunno what im writing here im just trying to fill space tbh lol',
  ],
};

const flashcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return { list: action.list };
    default:
      return state;
  }
};

export default flashcardsReducer;
