import React       from "react";
import { connect } from "react-redux";
import PropTypes   from "prop-types";
import classNames  from "classnames";

import Button     from "../Button";
import IconButton from "../IconButton";

import * as actions from "../../actions";
import * as styles  from "./styles.modules.css";

class MarkdownEditorMenu extends React.Component {
    static get propTypes() {
        return {
            iconsSet: PropTypes.string.isRequired
        };
    }

    state = {
        enabled:        false,
        isMaterialized: false,
    };

    componentWillMount() {
        this.setState({ isMaterialized: this.props.iconsSet !== 'font-awesome' })
    }

    static getDerivedStateFromProps(props, state) {
        const { currentSelection } = props;
        return {
            ...state,
            enabled:        !!currentSelection,
            isMaterialized: props.iconsSet !== 'font-awesome',
        };
    }

    render() {
        const isDisabled = (!this.state.enabled) ? 'disabled' : '';
        const { isMaterialized } = this.state;
        const {
            makeBold,
            makeImage,
            makeItalic,
            makeUnderline,
            makeHeader,
            makeSubHeader,
            makeLink,
            makeList,
        } = this.props;
        return (
            <div className={classNames('md-editor-menu', styles.styleMarkdownMenu)}>
                <IconButton
                    isMaterialized={isMaterialized}
                    isDisabled={isDisabled}
                    onClickHandler={makeBold}
                    iconName={'bold'}
                    containerClassName={classNames('bold-btn')}
                />
                <IconButton
                    isMaterialized={isMaterialized}
                    isDisabled={isDisabled}
                    onClickHandler={makeItalic}
                    iconName={'italic'}
                    containerClassName={classNames('italic-btn')}
                />
                <Button
                    className={'md-editor-menu-header'}
                    text={"Header"}
                    isDisabled={isDisabled}
                    onClickHandler={makeHeader}
                />
                <Button
                    className={'md-editor-menu-subheader'}
                    text={"Subheader"}
                    isDisabled={isDisabled}
                    onClickHandler={makeSubHeader}
                />
                <IconButton
                    isMaterialized={isMaterialized}
                    isDisabled={isDisabled}
                    onClickHandler={makeList}
                    iconName={'bulletList'}
                    containerClassName={classNames('list-btn')}
                />
                <IconButton
                    isMaterialized={isMaterialized}
                    isDisabled={isDisabled}
                    onClickHandler={makeImage}
                    iconName={'image'}
                    containerClassName={classNames('insert-img-btn')}
                />
                <IconButton
                    isMaterialized={isMaterialized}
                    isDisabled={isDisabled}
                    onClickHandler={makeLink}
                    iconName={'link'}
                    containerClassName={classNames('insert-link-btn')}
                />
            </div>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch, { currentSelection, markdown }) => ({
    makeBold:      () => dispatch(actions.makeBold({
        selection: currentSelection,
        text:      markdown,
    })),
    makeImage:     () => dispatch(actions.makeImage({
        selection: currentSelection,
        text:      markdown,
    })),
    makeItalic:    () => dispatch(actions.makeItalic({
        selection: currentSelection,
        text:      markdown,
    })),
    makeLink:      () => dispatch(actions.makeLink({
        selection: currentSelection,
        text:      markdown,
    })),
    makeList:      () => dispatch(actions.makeList({
        selection: currentSelection,
        text:      markdown,
    })),
    makeHeader:    () => dispatch(actions.makeHeader({
        selection: currentSelection,
        text:      markdown,
    })),
    makeSubHeader: () => dispatch(actions.makeSubHeader({
        selection: currentSelection,
        text:      markdown,
    })),
    makeUnderline: () => dispatch(actions.makeUnderline({
        selection: currentSelection,
        text:      markdown,
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditorMenu);
