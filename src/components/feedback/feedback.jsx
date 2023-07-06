import React, { Component } from 'react';

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
      total: 0,
      positiveFeedback: 0,
    };
  }

  countPositiveFeedback = () => {
    if (this.state.total === 0) {
      return 0;
    } else {
      this.setState({
        positiveFeedback: Math.round(
          (this.state.good / this.state.total) * 100
        ),
      });
    }
  };
  countTotalFeedback = () => {
    this.setState({ total: this.state.total + 1 });
  };

  handleAddGoodReview = () => {
    console.log('Good was clicked');
    this.setState({ good: this.state.good + 1 });
    this.countTotalFeedback();
    this.countPositiveFeedback();
  };
  handleAddNeutralReview = () => {
    console.log('Neutral was clicked');
    this.setState({
      neutral: this.state.neutral + 1,
    });
    this.countTotalFeedback();
    this.countPositiveFeedback();
  };
  handleAddBadReview = () => {
    console.log('Bad was clicked');
    this.setState({ bad: this.state.bad + 1 });
    this.countTotalFeedback();
    this.countPositiveFeedback();
  };

  render() {
    const { good, neutral, bad, total, positiveFeedback } = this.state;

    return (
      <div>
        <span>Good: {good}</span>
        <span>Neutral: {neutral}</span>
        <span>Bad: {bad}</span>
        <span>Total: {total}</span>
        <span>Positive Feedback: {positiveFeedback}%</span>
        <button type="button" onClick={this.handleAddGoodReview}>
          Good {good}
        </button>
        <button type="button" onClick={this.handleAddNeutralReview}>
          Neutral {neutral}
        </button>
        <button type="button" onClick={this.handleAddBadReview}>
          Bad {bad}
        </button>
      </div>
    );
  }
}
