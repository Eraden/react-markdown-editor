import * as types from "./types";

const content = (state = { markdown: "" }, { type, payload }) => {
    switch (type) {
        case types.BOLD_CHOSEN:
        case types.IMAGE_CHOSEN:
        case types.ITALIC_CHOSEN:
        case types.LINK_CHOSEN:
        case types.LIST_CHOSEN:
        case types.HEADER_CHOSEN:
        case types.SUBHEADER_CHOSEN:
        case types.UNDERLINE_CHOSEN:
        case types.TEXT_UPDATED:
            return { ...state, markdown: payload };
        default:
            return state;
    }
};

export default content;

export const getMarkdown = ({state, storeField}) =>
    state[storeField].content.markdown;
