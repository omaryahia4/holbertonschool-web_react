import { Component } from 'react';
import Notifications from './src/Notifications/Notifications';
import Footer from './src/Footer/Footer';
import Header from './src/Header/Header';
import Login from './src/Login/Login';
import CourseList from './src/CourseList/CourseList';
import { getLatestNotification } from './src/utils/utils';
import BodySectionWithMarginBottom from './src/BodySection/BodySectionWithMarginBottom';
import BodySection from './src/BodySection/BodySection';
import './src/App/App.css';

const notificationsList = [
  { id:1, type:'default', value:'New course available' },
  { id:2, type:'urgent', value:'New resume available' },
  { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
];

const coursesList = [
  { id:1, name:'ES6', credit:60 },
  { id:2, name:'Webpack', credit:20 },
  { id:3, name:'React', credit:40 }
];


class App extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const { isLoggedIn = false } = this.props;
  
      return (
        <>
          <Notifications notifications={notificationsList} />
          <Header />
          {
            isLoggedIn ? (
              <BodySectionWithMarginBottom title='Course List'>
                <p>No courses available.</p>
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login />
              </BodySectionWithMarginBottom>
            )
          }
          <BodySection title="News from the School">
            <p>
              Holberton School news goes here
            </p>
          </BodySection>
          <Footer />
        </>
      );
    }
  }

export default App;  // Should FAIL