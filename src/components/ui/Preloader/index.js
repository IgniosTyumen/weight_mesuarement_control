import React from 'react';
import classnames from "classnames";
import styles from './Preloader.css';

const LoadingIndicator = ({ children }) => {
  return <div>
    <div className={styles.spinner__text}>{children}</div>
    <div className={styles.spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div></div>
    </div>
  </div>
}

const Preloader = ({ children, className, isShow }) => {
  const classes = classnames([className, styles.container], {
    [styles.isShow]: isShow
  })
  return <div className={classes}>
    <LoadingIndicator>
      {children}
    </LoadingIndicator>
  </div>
}

export default Preloader;