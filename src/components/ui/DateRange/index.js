import React from "react";
import DateRangePicker from "react-daterange-picker";
import "./react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Button from "~/components/ui/Button";

const moment = extendMoment(originalMoment);

class DateRange extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: false,
      value: moment.range(
        today,
        today
      ),
    };
  }

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    const value = this.props.value || this.state.value;
    return (
      <div>
        <div>Период</div>
        {value.start.format("YYYY-MM-DD")}
        {" - "}
        {value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderSelectionValue()}</div>

        <div>
          <Button
            onClick={this.onToggle}
            size='custom'
            variant='primary'
          >
            Указать период
          </Button>
        </div>

        {this.state.isOpen && (
          <DateRangePicker
            locale='ru'
            value={this.props.value || this.state.value}
            onSelect={this.props.onSelect}
            singleDateRange={true}
          />
        )}
      </div>
    );
  }
}

export default DateRange;