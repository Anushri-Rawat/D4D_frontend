import { OPENLOGIN, CLOSELOGIN } from "../constants/modalConstants";

export const openLoginReducers = (state, action) => {
  switch (action.type) {
    case OPENLOGIN:
      return { ...state, openLogin: true };
    case CLOSELOGIN:
      return { ...state, openLogin: false };
    default:
      return state;
  }
};
