import React      from "react";
import classNames from "classnames";

import * as styles from "./styles.modules.css";

const materializedLibrary = ({
    italic:     'format_italic',
    bold:       'format_bold',
    image:      'insert_photo',
    link:       'insert_link',
    bulletList: 'format_list_bulleted',
});

const fontAwesomeLibrary = ({
    italic:     'fa-italic',
    bold:       'fa-bold',
    image:      'fa-file-image-o',
    link:       'fa-link',
    bulletList: 'fa-list-ul',
});

const resolveIcon = (library, iconName) =>
    library[iconName] || iconName;

const IconButton = ({ isMaterialized, isDisabled, onClickHandler, iconName, containerClassName }) =>
    isMaterialized
        ? (
            <div
                role='button'
                className={classNames(containerClassName, styles.markdownButton)}
                disabled={isDisabled}
                onClick={onClickHandler}
            >
                <i className='material-icons'>
                    {resolveIcon(materializedLibrary, iconName)}
                </i>
            </div>
        )
        :
        (
            <div
                role='button'
                className={classNames(containerClassName, styles.markdownButton)}
                disabled={isDisabled}
                onClick={onClickHandler}
            >
                <i className={`fa ${resolveIcon(fontAwesomeLibrary, iconName)}`}>&nbsp;</i>
            </div>
        );

export default IconButton;
