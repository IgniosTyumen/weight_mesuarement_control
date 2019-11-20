import React from "react";
import classNames from "classnames";
import styles from "./Button.css";

const variants = {
  'primary': 'primary',
  'default': 'default',
  'square': 'square'
}

const sizes = {
  'big': 'big',
}

const Button = ({
  children, size = 'big', variant = 'default', className, onClick
}) => {
  const classes = classNames(
    styles.button,
    styles[variants[variant]],
    styles[sizes[size]],
    className,
  );
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;