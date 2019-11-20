import React from "react";
import classNames from "classnames";
import styles from "./Burger.css";

const Burger = ({ isOpen, onClick }) => {
  const classes = classNames(
    styles.container,
    {
      [styles.isOpen]: isOpen
    });
  
  return (
    <div className={classes} onClick={onClick} >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  )
}

export default Burger;