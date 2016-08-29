import React from 'react';
import { Pagination, Pager } from 'react-bootstrap';

export default class MainView extends React.Component {
  static propTypes = {
    questionNo:       React.PropTypes.number,
    dataNo:           React.PropTypes.number,
    onSelectAnswerNo: React.PropTypes.func,
    onSelectPrevData: React.PropTypes.func,
    onSelectNextData: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      answerNo: 1,
    };

    document.onkeydown = this.onKeyDown;
  }

  onKeyDown(e) {
    // left
    if (e.which == 37) {
      e.preventDefault();
      if (e.shiftKey) {
        document.querySelector(".answer-form-nav .pager > li:first-child > a").click();
      } else {
        document.querySelector(".answer-form-nav .pagination > li:first-child > a").click();
      }
    }
    // right
    if (e.which == 39) {
      e.preventDefault();
      if (e.shiftKey) {
        document.querySelector(".answer-form-nav .pager > li:last-child > a").click();
      } else {
        document.querySelector(".answer-form-nav .pagination > li:last-child > a").click();
      }
    }
  }

  setAnswerNo(answerNo) {
    this.setState({ answerNo });
  }

  render() {
    const questionNo = this.props.questionNo;
    const dataNo = this.props.dataNo;
    return (
      <div className="answer-form-nav">
        <Pagination
          prev
          next
          ellipsis
          boundaryLinks
          items      = {20}
          maxButtons = {8}
          activePage = {this.state.answerNo}
          onSelect   = {this.props.onSelectAnswerNo}
        />
        <Pager>
          <Pager.Item

            disabled = {questionNo == 1 && dataNo == 0}
            onSelect = {this.props.onSelectPrevData}
          >
            &larr; 前のデータへ
          </Pager.Item>
          {' '}
          <Pager.Item
            disabled = {questionNo == 3 && dataNo == 9}
            onSelect = {this.props.onSelectNextData}
          >
            次のデータへ &rarr;
          </Pager.Item>
        </Pager>
      </div>
    );
  }
}