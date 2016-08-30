import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Grid, Row, Col, Thumbnail, Jumbotron } from 'react-bootstrap';
import Axios from 'axios';
import { AutoAffix } from 'react-overlays';
import NavBox from './NavBox';
import AnswerForm from './AnswerForm';
import AnswerFormNav from './AnswerFormNav';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNo: 1,
      dataNo: 0,
      dataIDs: [],
      submitted: false,
    };

    this.points = {};
    this.order = {};

    Axios.get(`api/points/${props.params.reviewerID}`)
      .then((response) => {
        this.points = response.data.data;
        this.order = response.data.order;
        let dataIDs = [];
        for (const dataID in this.points['1']) {
          dataIDs.push(dataID);
        }
        const submitted = response.data.submitted;
        this.setState({
          dataIDs,
          submitted,
        });
      })
      .catch((error) => {
      });
  }

  onClickDataNo(e) {
    const dataNo = parseInt(e.target.innerText, 10) - 1;
    this.setState({ dataNo });
    ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft = 0;
  }

  onClickQuestionNo(e) {
    const questionNo = parseInt(e.target.innerText, 10);
    this.setState({
      questionNo,
      dataNo: 0,
    });
    ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft = 0;
  }

  onClickClear() {
    this.refs.answerForm.setPoints({});
  }

  onClickSave(e) {
    const submitDisabled = this.refs.navBox.getSubmitDisabled();
    this.refs.navBox.setSaveDisabled(true);
    this.refs.navBox.setSubmitDisabled(true);
    this.savePoints();
    Axios.put(`api/points/${this.props.params.reviewerID}`, {
      submitted: false,
      data: this.points,
      order: this.order,
    }).then((response) => {
        this.refs.navBox.setSaveDisabled(false);
        this.refs.navBox.setSubmitDisabled(submitDisabled);
      })
      .catch((error) => {
      });
  }

  onClickSubmit(e) {
    this.refs.navBox.setSaveDisabled(true);
    this.refs.navBox.setSubmitDisabled(true);
    this.savePoints();
    Axios.put(`api/points/${this.props.params.reviewerID}`, {
      submitted: true,
      data: this.points,
      order: this.order,
    }).then((response) => {
        const submitted = response.data.submitted;
        this.setState({ submitted });
      })
      .catch((error) => {
      });
  }

  onChangePoint() {
    this.savePoints();
    let allCompleted = true;
    let progress = {};
    for (const questionNo in this.points) {
      progress[questionNo] = [];
      for (const dataID in this.points[questionNo])  {
        let answered = 0;
        let dataNum = 0;
        for (const answerID in this.points[questionNo][dataID]) {
          if (this.points[questionNo][dataID][answerID] !== null) {
            answered++;
          } else {
            allCompleted = false;
          }
          dataNum++;
        }
        progress[questionNo].push({
          dataNum,
          answered,
        });
      }
    }
    this.refs.navBox.setProgress(progress, allCompleted);
  }

  onScrollAnswerForm(e) {
    const imageBoxPositions = this.refs.answerForm.getImageBoxPositions();
    const scrollLeft = ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft;
    let answerNo = imageBoxPositions.length;
    for (let i = imageBoxPositions.length - 1; i >= 0; i--) {
      if (scrollLeft <= imageBoxPositions[i]) {
        answerNo = i + 1;
      }
    }
    this.refs.answerFormNav.setAnswerNo(answerNo);
  }

  onSelectAnswerNo(no) {
    const imageBoxPositions = this.refs.answerForm.getImageBoxPositions();
    ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft = imageBoxPositions[no - 1];
  }

  onSelectPrevData() {
    const dataNo = this.state.dataNo - 1;
    if (dataNo >= 0) {
      this.setState({
        dataNo,
      });
    } else {
      const questionNo = this.state.questionNo - 1;
      const dataNo = this.state.dataIDs.length - 1;
      this.setState({
        questionNo,
        dataNo,
      });
    }
    ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft = 0;
  }

  onSelectNextData() {
    const dataNo = this.state.dataNo + 1;
    if (dataNo < this.state.dataIDs.length) {
      this.setState({
        dataNo,
      });
    } else {
      const questionNo = this.state.questionNo + 1;
      const dataNo = 0;
      this.setState({
        questionNo,
        dataNo,
      });
    }
    ReactDOM.findDOMNode(this.refs.answerForm).scrollLeft = 0;
  }

  componentWillUpdate(nextProps, nextState) {
    this.savePoints();
  }

  componentDidUpdate(prevProps, prevState) {
    const questionNo = this.state.questionNo;
    const dataID = this.state.dataIDs[this.state.dataNo];
    this.refs.answerForm.setPoints(this.points[questionNo][dataID]);
  }

  savePoints() {
    const questionNo = this.state.questionNo;
    const dataID = this.state.dataIDs[this.state.dataNo];
    if (this.refs.answerForm === undefined) return;
    this.points[questionNo][dataID] = this.refs.answerForm.getPoints();
  }

  render() {
    const questionNo = this.state.questionNo;
    const dataNo = this.state.dataNo;
    const dataID = this.state.dataIDs[dataNo];

    if (dataID === undefined) {
      return <div className="main-view"></div>;
    }

    if (this.state.submitted) {
      return (
        <div className="main-view container">
          <Jumbotron>
            <p>
              ご協力いただきありがとうございました．<br />
              採点を修正したい場合は @hiroki.chiba までご連絡ください．
            </p>
          </Jumbotron>
        </div>
      );
    }

    return (
      <div className="main-view">
        <NavBox
          ref               = "navBox"
          questionNo        = {questionNo}
          dataNo            = {dataNo}
          src               = {`assets/${questionNo}/${dataID}.png`}
          onClickQuestionNo = {this.onClickQuestionNo.bind(this)}
          onClickDataNo     = {this.onClickDataNo.bind(this)}
          onClickClear      = {this.onClickClear.bind(this)}
          onClickSave       = {this.onClickSave.bind(this)}
          onClickSubmit     = {this.onClickSubmit.bind(this)}
        />
        <div className="answer-form-wrapper">
          <AnswerForm
            ref           = "answerForm"
            questionNo    = {questionNo}
            dataID        = {dataID}
            answerIDs     = {this.order[questionNo][dataID]}
            onChangePoint = {this.onChangePoint.bind(this)}
            onScroll      = {this.onScrollAnswerForm.bind(this)}
          />
          <AnswerFormNav
            ref              = "answerFormNav"
            questionNo       = {questionNo}
            dataNo           = {dataNo}
            onSelectAnswerNo = {this.onSelectAnswerNo.bind(this)}
            onSelectPrevData = {this.onSelectPrevData.bind(this)}
            onSelectNextData = {this.onSelectNextData.bind(this)}
          />
        </div>
      </div>
    );
  }
}
