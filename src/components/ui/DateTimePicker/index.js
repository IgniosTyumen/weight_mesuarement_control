import React, { Component } from 'react';
import DateTime from 'react-datetime';
import classNames from 'classnames';

import Icon from '~/components/ui/Icon';

import styles from './DateTimePicker.css';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClear = () => {
    const { onChange } = this.props;
    onChange(null);
  }

  render() {
    const { handleClear } = this;
    const { isOpen } = this.state;
    const { onChange, value, label } = this.props;

    const labelClasses = classNames(
      styles.label,
      isOpen || value ? styles.labelActive : undefined
    )

    return (
      <div className={styles.wrapper}>
        <label className={labelClasses}>{label}</label>
        <DateTime
          value={value}
          onChange={onChange}
          timeFormat='HH:mm'
          dateFormat='DD-MM-YYYY'
          onFocus={() => this.setState({isOpen: true})}
          onBlur={() => this.setState({isOpen: false})}
        />
        { value &&
          <button
            onClick={handleClear}
            className={styles.close}
          >
            <Icon name='close'/>
          </button>
        }
      </div>
    )
  }
}

export default DateTimePicker;