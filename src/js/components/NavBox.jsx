import React from 'react';
import { ButtonGroup, Button, ProgressBar } from 'react-bootstrap';
import PointButton from './PointButton';

export default class NavBox extends React.Component {
  static propTypes = {
    questionNo:        React.PropTypes.number,
    dataNo:            React.PropTypes.number,
    onClickQuestionNo: React.PropTypes.func,
    onClickDataNo:     React.PropTypes.func,
    onClickClear:      React.PropTypes.func,
    onClickSave:       React.PropTypes.func,
    onClickSubmit:     React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: {},
      saveDisabled: false,
      submitDisabled: true,
    }
  }

  setProgress(progress, allCompleted) {
    this.setState({
      progress,
      submitDisabled: !allCompleted,
    });
  }

  setSaveDisabled(saveDisabled) {
    this.setState({ saveDisabled });
  }

  setSubmitDisabled(submitDisabled) {
    this.setState({ submitDisabled });
  }

  getSubmitDisabled() {
    return this.state.submitDisabled;
  }

  checkQuestionCompleted(questionNo) {
    const progresses = this.state.progress[questionNo];
    for (const progress of progresses) {
      if (progress.answered != progress.dataNum) {
        return false;
      }
    }
    return true;
  }

  checkDataCompleted(dataNo) {
    const progress = this.state.progress[this.props.questionNo][dataNo];
    if (progress.answered != progress.dataNum) {
      return false;
    }
    return true;
  }

  render() {
    const questionNo = this.props.questionNo;
    const dataNo = this.props.dataNo;

    if (this.state.progress[questionNo] === undefined) {
      return <div className="nav-box"></div>;
    }

    const questionNum = Object.keys(this.state.progress).length;
    const dataNum = Object.keys(this.state.progress[questionNo]).length;
    const pageProgress = this.state.progress[questionNo][dataNo];

    return (
      <div className="thumbnail nav-box">
        <img src={this.props.src} alt={this.props.answerNo} />
        <h3 className="answer-no">見本</h3>
        <div className="caption">
          {
            questionNum > 1 ?
            (
              <div className="nav-group">
                <label className="control-label">問題</label>
                <ButtonGroup justified>
                  {
                    [...Array(questionNum).keys(0)].map((elem, index) => {
                      const style = this.checkQuestionCompleted(index + 1) ? 'success' : 'default';
                      return (
                        <PointButton
                          point         = {index + 1}
                          selectedPoint = {questionNo}
                          bsStyle       = {style}
                          onClick       = {this.props.onClickQuestionNo}
                          key           = {index}
                        />
                      );
                    })
                  }
                </ButtonGroup>
              </div>
            ) : ""
          }
          <div className="nav-group">
            <label className="control-label">データ</label>
            <ButtonGroup justified>
              {
                [...Array(dataNum).keys(0)].map((elem, index) => {
                  const style = this.checkDataCompleted(index) ? 'success' : 'default';
                  return (
                    <PointButton
                      point         = {index + 1}
                      selectedPoint = {dataNo + 1}
                      bsStyle       = {style}
                      onClick       = {this.props.onClickDataNo}
                      key           = {index}
                    />
                  );
                })
              }
            </ButtonGroup>
          </div>
          <div className="nav-group">
            <label className="control-label"></label>
            <ProgressBar
              now     = {100 * pageProgress.answered / pageProgress.dataNum}
              label   = {`${pageProgress.answered} / ${pageProgress.dataNum} 完了`}
              bsStyle = 'success'
            />
          </div>
          <div className="nav-group">
            <Button
              onClick = {this.props.onClickClear}
              bsStyle = "link"
            >
              { questionNum > 1 ? `問題 ${questionNo} ` : "" }データ {dataNo + 1} の採点をリセット
            </Button>
            <div>
              <Button
                onClick  = {this.props.onClickSave}
                disabled = {this.state.saveDisabled}
                bsStyle  = 'info'
              >
                一時保存
              </Button>
              <Button
                onClick  = {this.props.onClickSubmit}
                disabled = {this.state.submitDisabled}
                bsStyle  = 'primary'
              >
                採点終了
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
