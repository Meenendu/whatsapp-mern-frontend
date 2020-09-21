export const initialState = {
  user: null,
  selectedGroup: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SELECTED_GROUP: "SELECTED_GROUP",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.group,
      };
    default:
      return state;
  }
};
