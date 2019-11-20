import React from 'react';
import classNames from 'classnames';
import styles from './Input.css';
import Icon from "~/components/ui/Icon";

class Input extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFocus: false,
    }
  }
  handleFocus = (e) => {
    const { onFocus } = this.props;
    this.setState({ isFocus: true });
    if (onFocus){
      onFocus(e);
    }
  }
  handleBlur = (e) => {
    const { onBlur } = this.props;
    setTimeout(() => {
      this.setState({ isFocus: false });
      if (onBlur) {
        onBlur(e);
      }
    }, 150);
  }
  render(){
    const {
      type, value, label, className, onChange, onClear
    } = this.props;
    const { isFocus } = this.state;

    const labelClasses = classNames(
      styles.label,
      {
        [styles.filledInputLabel]: !!value || isFocus,
      },
    );
    const containerClasses = classNames(
      styles.container,
      className
    );

    return (
      <div className={containerClasses}>
        <input
          className={styles.input}
          type={type}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
        />
        <label className={labelClasses}>{label}</label>
        {
          isFocus && (
            <button className={styles.close} onClick={onClear}>
              <Icon name='close' />
            </button>
          )
        }

      </div>
    );
  }
}

export default Input;
