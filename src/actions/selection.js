import * as types from "../reducers/types";

export const setSelection = (selection) => ({
    type: types.SELECTION_SET,
    payload: selection,
});

export const clearSelection = () => ({
    type: types.SELECTION_CLEARED
});
