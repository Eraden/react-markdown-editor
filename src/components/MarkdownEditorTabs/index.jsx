import React       from "react";
import { connect } from "react-redux";
import classNames  from "classnames";
import PropTypes   from "prop-types";

import * as styles  from "./styles.modules.css";
import * as types   from "../../reducers/types";
import * as tabs    from "../../reducers/tabs";
import * as actions from "../../actions";

const MarkdownEditorTabs = ({ activeTab, editorTabClicked, previewTabClicked }) => (
    <div className={classNames(
        styles.styleMarkdownEditorTabs,
        'md-editor-tabs'
    )}>
        <div
            className={classNames(
                activeTab === types.EDITOR ? styles.styleActiveTab : styles.styleTab,
                "md-editor-tabs-item"
            )}
            onClick={editorTabClicked}
        >
            <span>Editor</span>
        </div>
        <div
            className={classNames(
                activeTab === types.PREVIEW ? styles.styleActiveTab : styles.styleTab,
                "md-editor-tabs-item"
            )}
            onClick={previewTabClicked}
        >
            <span>Preview</span>
        </div>
    </div>
);
MarkdownEditorTabs.propTypes = {
    storeField: PropTypes.string.isRequired,
    activeTab:  PropTypes.number,
};

const mapStateToProps = (state, { storeField }) => ({
    activeTab: tabs.getActiveTab({ storeField, state }),
});
const mapDispatchToProps = (dispatch) => ({
    editorTabClicked:  () => dispatch(actions.editorTabClicked()),
    previewTabClicked: () => dispatch(actions.previewTabClicked()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditorTabs);
