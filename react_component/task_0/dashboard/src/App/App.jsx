import React from 'react';
import './App.css';
import Notification from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

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

class App extends React.Component {
  render() {
    const { isLoggedIn = false } = this.props;

    return (
      <>
        <Notification notifications={notificationsList} />
        <div className="App">
          <Header />
          {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
          <Footer />
        </div>
      </>
    );
  }
}

export default App;