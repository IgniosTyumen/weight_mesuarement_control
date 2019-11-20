
import React from 'react';
import styles from './Range.css';

class Range extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      onChange,
      geometryWight,
      label,
    } = this.props;

    return <div>
      <div className={styles.title}>{label}</div>
      <input
        className={styles.range_input}
        onMouseUp={onChange}
        type="range"
        id="start"
        name="volume"
        min="0"
        max="15"
        value={geometryWight}
      />
    </div>
  }
}

export default Range;