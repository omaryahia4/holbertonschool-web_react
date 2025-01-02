import React from 'react';
import Notification from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from "../Login/Login"
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { StyleSheet, css } from 'aphrodite';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

const styles = StyleSheet.create({
  header: {
    color: '#e0454b',
  },
  body: {
    borderTop: 'solid',
    borderBottom: 'solid',
    borderColor: '#e0454b',
    height: '50vh',
    padding: '30px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontFamily: 'sans-serif'
  },
});

class App extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      if (this.props.logOut) {
        this.props.logOut();
      }
    }
  }

  render() {
    const { isLoggedIn = false } = this.props;

    return (
      <>
        <Notification notifications={notificationsList} />
        <div className={css(styles.header)}>
          <Header />
        </div>
          {isLoggedIn ? 
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={coursesList} />
          </BodySectionWithMarginBottom>
          :
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login />
          </BodySectionWithMarginBottom>
          }
          <BodySection className={css(styles.body)}>
            News from the School
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer className={css(styles.footer)} />
      </>
    );
  }
}

export default App;
