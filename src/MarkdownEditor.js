import React        from "react";
import { Provider } from "react-redux";

import store from "./store";

import MarkdownEditor from "./components/MarkdownEditor";

const MarkdownEditorProvider = (props) => (
    <Provider store={store}>
        <MarkdownEditor {...props} />
    </Provider>
);


export default MarkdownEditorProvider;
