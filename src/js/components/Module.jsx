import React from 'react';

export default class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: 'This is a skeleton',
    };
  }

  render() {
    return (
      <div className="module">
        {this.state.message}
      </div>
    );
  }
}
