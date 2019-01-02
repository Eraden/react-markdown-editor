import * as types from "./types";

const tabs = (state = { activeTab: types.EDITOR }, { type }) => {
    switch (type) {
        case types.PREVIEW_TAB_CLICKED:
            return { ...state, activeTab: types.PREVIEW };
        case types.EDITOR_TAB_CLICKED:
            return { ...state, activeTab: types.EDITOR };
        default:
            return state;
    }
};

export default tabs;

export const getActiveTab = ({ state, storeField }) =>
    state[storeField].tabs.activeTab;
