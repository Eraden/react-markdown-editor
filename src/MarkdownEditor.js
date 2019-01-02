import React          from "react";
import { Provider }   from "react-redux";
import * as PropTypes from "prop-types";

import MarkdownEditor from "./components/MarkdownEditor";

export reducers from "./reducers";

const MarkdownEditorProvider = ({ store, name, ...rest }) => (
    <Provider store={store}>
        <MarkdownEditor {...rest} storeField={name} />
    </Provider>
);

MarkdownEditorProvider.propTypes = {
    store: PropTypes.object.isRequired,
    name:  PropTypes.string.isRequired,
};


export default MarkdownEditorProvider;
