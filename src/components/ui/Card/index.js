import React from 'react';
import classnames from "classnames";
import styles from './Card.css';

const Card = ({children, className}) => {
  const classes = classnames([className, styles.container])
  return <div className={classes}>
    {children}
  </div>
}

export default Card;