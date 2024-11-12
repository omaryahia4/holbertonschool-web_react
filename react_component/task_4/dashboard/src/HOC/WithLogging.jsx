import React from 'react';

const withLogging = (WrappedComponent) => {
  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'; 

  class WithLoggingComponent extends React.Component {

    componentDidMount() {
      this.isMounted();
    }

    componentWillUnmount() {
      this.isUnmouted();
    }

    isMounted() {
      console.log(`Component ${name} is mounted`);
    }

    isUnmouted() {
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithLoggingComponent.displayName = `WithLogging(${WrappedComponent})`;
  return WithLoggingComponent;
};


export default withLogging;