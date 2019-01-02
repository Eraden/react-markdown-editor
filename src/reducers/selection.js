import * as types from "./types";

const selection = (state = { currentSelection: null }, { type, payload }) => {
    switch (type) {
        case types.SELECTION_CLEARED:
            return { ...state, currentSelection: null };
        case types.SELECTION_SET:
            return { ...state, currentSelection: payload };
        case types.BOLD_CHOSEN:
        case types.IMAGE_CHOSEN:
        case types.ITALIC_CHOSEN:
        case types.LINK_CHOSEN:
        case types.LIST_CHOSEN:
        case types.HEADER_CHOSEN:
        case types.SUBHEADER_CHOSEN:
        case types.UNDERLINE_CHOSEN: {
            let { currentSelection } = state;
            if (currentSelection) {
                const { selectionStart } = currentSelection;
                currentSelection = {
                    selectionEnd: selectionStart,
                    selectionStart,
                };
            }
            return {
                ...state,
                currentSelection,
            };
        }
        default:
            return state;
    }
};

export default selection;

export const getCurrentSelection = ({ state, storeField }) =>
    state[storeField].selection.currentSelection;
