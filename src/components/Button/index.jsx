import React      from "react";
import classNames from "classnames";

import * as styles from "./styles.modules.css";

const Button = ({ isDisabled, onClickHandler, className, text }) => (
    <div
        role='button'
        className={classNames(className, styles.buttonWithoutIcon)}
        disabled={isDisabled}
        onClick={onClickHandler}
    >
        <span>{text}</span>
    </div>
);

export default Button;
