import React from 'react';
import { Button } from 'react-bootstrap';

export default class PointButton extends React.Component {
  static propTypes = {
    point:         React.PropTypes.number,
    selectedPoint: React.PropTypes.number,
    bsStyle:       React.PropTypes.string,
    onClick:       React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const isActive = this.props.selectedPoint == this.props.point;
    return (
      <Button
        onClick = {this.props.onClick}
        bsStyle = {this.props.bsStyle}
        active  = {isActive}
      >
        {this.props.point}
      </Button>
    );
  }
}
