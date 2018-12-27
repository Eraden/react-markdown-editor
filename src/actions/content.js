import * as types from "../reducers/types";

export const updateText = (text) => ({
    type: types.TEXT_UPDATED,
    payload: text,
});
