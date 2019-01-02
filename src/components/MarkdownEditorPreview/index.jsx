import React      from "react";
import PropTypes  from "prop-types";
import { parse }  from "markdown";
import classNames from "classnames";

import * as styles from './styles.modules.css';

const MarkdownEditorPreview = ({ content }) => (
    <div
        className={classNames(styles.styleMarkdownPreviewArea)}
        dangerouslySetInnerHTML={{ __html: parse(content.replace(/[\n]/g, '  \n')) }}
    />
);

MarkdownEditorPreview.propTypes = {
    content: PropTypes.string.isRequired
};

export default MarkdownEditorPreview;
