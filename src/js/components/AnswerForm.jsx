import React from 'react';
import { Well } from 'react-bootstrap';
import AnswerImageBox from './AnswerImageBox';

export default class AnswerForm extends React.Component {
  static propTypes = {
    questionNo:    React.PropTypes.number.isRequired,
    dataID:        React.PropTypes.string.isRequired,
    answerIDs:     React.PropTypes.arrayOf(React.PropTypes.string),
    onChangePoint: React.PropTypes.func,
    onScroll:      React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setImageBoxPositions();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setImageBoxPositions();
  }

  setImageBoxPositions() {
    const imageBoxes = document.querySelectorAll('.answer-image-box');
    let imageBoxPositions = [];
    for (let i = 0; i < imageBoxes.length; i++) {
      const rect = imageBoxes[i].getBoundingClientRect();
      imageBoxPositions.push(imageBoxes[i].offsetLeft - imageBoxes[0].offsetLeft);
    }
    this.imageBoxPositions = imageBoxPositions;
  }

  getPoints() {
    let points = {};
    for (const answerID of this.props.answerIDs) {
      points[answerID] = this.refs[answerID].getPoint();
    }
    return points;
  }

  setPoints(points) {
    for (const answerID of this.props.answerIDs) {
      let point = points[answerID];
      if (point === undefined) {
        point = null;
      }
      this.refs[answerID].setPoint(point);
    }
  }

  getImageBoxPositions() {
    return this.imageBoxPositions;
  }

  render() {
    return (
      <div className="answer-form" onScroll={this.props.onScroll}>
        {
          this.props.answerIDs.map((elem, index) => {
            return (
              <AnswerImageBox
                ref           = {elem}
                key           = {index}
                answerNo      = {index + 1}
                src           = {`assets/${this.props.questionNo}/${this.props.dataID}/${elem}.png`}
                onChangePoint = {this.props.onChangePoint}
              />
            );
          })
        }
        <div className="answer-form-blank">
          <Well></Well>
        </div>
      </div>
    );
  }
}
