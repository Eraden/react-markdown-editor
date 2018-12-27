import * as types from "../reducers/types";

import generateMarkdownToken from "../utils/tokens";

const updateText = ({ text, selection, action }) =>
    selection
        ? [
            text.slice(0, selection.selectionStart),
            generateMarkdownToken(action)(selection.selectedText),
            text.slice(selection.selectionEnd, text.length),
        ].join("")
        : text;

export const makeBold = ({ selection, text }) => ({
    type:    types.BOLD_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "bold",
    }),
});
export const makeImage = ({ selection, text }) => ({
    type:    types.IMAGE_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "image",
    }),
});
export const makeItalic = ({ selection, text }) => ({
    type:    types.ITALIC_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "italic",
    }),
});
export const makeLink = ({ selection, text }) => ({
    type:    types.LINK_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "link",
    }),
});
export const makeList = ({ selection, text }) => ({
    type:    types.LIST_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "list",
    }),
});
export const makeHeader = ({ selection, text }) => ({
    type:    types.HEADER_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "header",
    }),
});
export const makeSubHeader = ({ selection, text }) => ({
    type:    types.SUBHEADER_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "subheader",
    }),
});
export const makeUnderline = ({ selection, text }) => ({
    type:    types.UNDERLINE_CHOSEN,
    payload: updateText({
        selection,
        text,
        action: "underline",
    }),
});
