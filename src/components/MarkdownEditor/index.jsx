import React       from "react";
import { connect } from "react-redux";
import PropTypes   from "prop-types";
import classNames  from "classnames";

import { toMarkdown }        from "../../utils/MarkdownUtils";
import MarkdownEditorMenu    from "../MarkdownEditorMenu";
import MarkdownEditorTabs    from "../MarkdownEditorTabs";
import MarkdownEditorContent from "../MarkdownEditorContent";
import MarkdownEditorPreview from "../MarkdownEditorPreview";

import * as types            from "../../reducers/types";
import generateMarkdownToken from "../../utils/tokens";
import * as actions          from "../../actions";
import * as styles           from "./styles.modules.css";

class MarkdownEditor extends React.Component {
    static get propTypes() {
        return {
            initialContent:  PropTypes.string.isRequired,
            className:       PropTypes.string,
            iconsSet:        PropTypes.oneOf(['font-awesome', 'materialize-ui']).isRequired,
            onContentChange: PropTypes.func,
            editorTabs:      PropTypes.bool
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            content:     this.props.initialContent,
            inEditMode:  true,
            instanceRef: Math.random().toString(36).substring(7)
        };
    }

    componentDidMount() {
        const { initialContent, updateText } = this.props;
        updateText(initialContent);
    }

    static getDerivedStateFromProps(props, state) {
        const { activeTab, markdown } = props;
        const inEditMode = activeTab === types.EDITOR;
        return {
            ...state,
            inEditMode,
            activeTab,
            content: markdown,
        };
    }

    render() {
        const { inEditMode, content, instanceRef } = this.state;
        const { editorTabs, iconsSet, className, currentSelection } = this.props;

        return (
            <div className={classNames(className, "mde-wrapper")}>
                <div className={styles.styleMarkdownEditorContainer}>
                    <div
                        className={classNames('md-editor-header', styles.styleMarkdownEditorHeader)}
                    >
                        {
                            editorTabs !== false
                                ? (
                                    <MarkdownEditorMenu
                                        iconsSet={iconsSet}
                                        instanceRef={instanceRef}
                                        markdown={content}
                                        currentSelection={currentSelection}
                                    />
                                )
                                : null
                        }
                        <MarkdownEditorTabs/>
                    </div>
                    {
                        inEditMode
                            ? (
                                <MarkdownEditorContent
                                    content={content}
                                    onChangeHandler={this.onChangeHandler}
                                />
                            )
                            : (
                                <MarkdownEditorPreview
                                    content={content}
                                />
                            )
                    }
                </div>
            </div>
        );
    }

    onChangeHandler = (newContent) => {
        const { onContentChange } = this.props;
        if (onContentChange) {
            onContentChange(newContent);
        }

        this.setState({ content: newContent });
    };

    updateText(text, selection, actionType) {
        const { updateText, onContentChange } = this.props;
        const beforeSelectionContent = text.slice(0, selection.selectionStart);
        const afterSelectionContent = text.slice(selection.selectionEnd, text.length);
        const updatedText = generateMarkdownToken(actionType)(selection.selectedText);
        const updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
        updateText(toMarkdown(updatedContent));
        this.setState({ content: updatedContent });

        if (onContentChange) {
            onContentChange(updatedContent);
        }
    }
}

const mapStateToProps = ({ tabs, selection, content }) => ({
    activeTab:        tabs.activeTab,
    currentSelection: selection.currentSelection,
    markdown:         content.markdown,
});
const mapDispatchToProps = dispatch => ({
    updateText: (text) => dispatch(actions.updateText(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
