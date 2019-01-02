import React       from "react";
import { connect } from "react-redux";
import PropTypes   from "prop-types";
import classNames  from "classnames";

import { toMarkdown } from "../../utils/MarkdownUtils";

import * as getters from "../../reducers/getters";
import * as actions from "../../actions";
import * as styles  from "./styles.modules.css";

const updateContent = ({ element, currentSelection, content }) => {
    if (!element)
        return;
    element.focus();
    element.value = content;
    if (!currentSelection)
        return;
    const { selectionEnd, selectionStart } = currentSelection;
    if (selectionEnd !== selectionStart) {
        element.selectionEnd = selectionEnd;
        element.selectionStart = selectionStart;
    }
};

class MarkdownEditorContent extends React.Component {
    static get propTypes() {
        return {
            content:         PropTypes.string.isRequired,
            onChangeHandler: PropTypes.func.isRequired,
            storeField:      PropTypes.string.isRequired,
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            canClear:         true,
            content:          props.content,
            currentSelection: props.currentSelection,
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { element } = state;
        const { content, currentSelection } = props;
        if (content !== state.content) {
            updateContent({
                element,
                content,
                currentSelection,
            });
        }
        return {
            ...state,
            element,
            content,
            currentSelection,
        };
    }

    bindElement = textArea => this.textAreaElement = textArea;

    bindSelectEvent = element => {
        element.removeEventListener('select', this.onSelectHandler);
        element.addEventListener('select', this.onSelectHandler);
    };

    unbindSelectEvent = element => element.removeEventListener('select', this.onSelectHandler);

    componentDidMount() {
        const element = this.textAreaElement;
        const { content, currentSelection, updateText } = this.props;
        this.bindSelectEvent(element);
        element.value = content;
        this.setState({ element, content, currentSelection });
        updateText(content);
    }

    componentWillUnmount() {
        const element = this.textAreaElement;
        if (element) {
            this.unbindSelectEvent(element);
        }
    }

    onSelectHandler = event => {
        const { setSelection } = this.props;
        const eventSource = event.srcElement || event.target;
        const { selectionStart, selectionEnd } = eventSource;
        const selectedText = eventSource.value.slice(selectionStart, selectionEnd);
        setSelection({
            selectionStart,
            selectionEnd,
            selectedText
        });
    };

    onChange = () => {
        const { onChangeHandler, updateText } = this.props;
        const content = this.textAreaElement.value;
        const markdownContent = toMarkdown(content);
        updateText(markdownContent);
        onChangeHandler(markdownContent);
    };

    render() {
        return (
            <textarea
                ref={this.bindElement}
                className={classNames('md-editor-textarea', styles.styleMarkdownTextArea)}
                onChange={this.onChange}
                onClick={this.onSelectHandler}
                onKeyUp={this.onSelectHandler}
                defaultValue={this.state.content}
            />
        );
    }
}

const mapStateToProps = (state, { storeField }) => ({
    currentSelection: getters.getCurrentSelection({ state, storeField }),
    content:          getters.getMarkdown({ state, storeField }),
});

const mapDispatchToProps = (dispatch) => ({
    updateText:   text => dispatch(actions.updateText(text)),
    setSelection: selection => dispatch(actions.setSelection(selection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditorContent);
