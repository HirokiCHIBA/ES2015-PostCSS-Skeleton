import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import PointButton from './PointButton';

export default class AnswerImageBox extends React.Component {
  static propTypes = {
    answerNo:      React.PropTypes.number,
    src:           React.PropTypes.string.isRequired,
    onChangePoint: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      point: null,
    };
  }

  onClickButton(e) {
    this.setPoint(parseInt(e.target.innerText, 10));
  }

  setPoint(point) {
    this.setState({ point });
  }

  getPoint() {
    return this.state.point;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      return;
    }
    if (this.props.onChangePoint !== undefined) {
      this.props.onChangePoint();
    }
  }

  render() {
    const answerd = this.state.point !== null ? 'answerd' : '';
    return (
      <div className={`thumbnail answer-image-box ${answerd}`}>
        <img src={this.props.src} alt={this.props.answerNo} />
        <h3 className="answer-no">{this.props.answerNo}</h3>
        <div className="caption">
          <ButtonGroup justified>
            {
              [...Array(11).keys(0)].map((elem, index) => {
                const style = this.state.point == elem ? 'success' : 'default';
                return (
                  <PointButton
                    key           = {elem}
                    point         = {elem}
                    selectedPoint = {this.state.point}
                    bsStyle       = {style}
                    onClick       = {this.onClickButton.bind(this)}
                  />
                );
              })
            }
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
