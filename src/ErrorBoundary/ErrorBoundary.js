import React, {Component} from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  };

  componentDidCatch = (error, info) => {
    console.log(error, info);
    this.setState({hasError: true, errorMessage: error});
  };

  render() {
    if (this.state.hasError) {
      return <div>Something wrong happened!</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
