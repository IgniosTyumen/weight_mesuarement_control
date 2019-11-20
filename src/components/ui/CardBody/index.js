import React from "react";
import classnames from "classnames";
import styles from "./CardBody.css";

const CardBody = ({ className, children }) => {
  const classes = classnames([styles.container, className, ])
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default CardBody;