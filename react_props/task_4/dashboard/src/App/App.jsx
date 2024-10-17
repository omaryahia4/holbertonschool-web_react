import './App.css'
import PropTypes from 'prop-types';
import Notification from '../Notifications/Notifications'
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

const coursesList = [
  { id:1, name:'ES6', credit:60 },
  { id:2, name:'Webpack', credit:20 },
  { id:3, name:'React', credit:40 }
];

function App({ isLoggedIn = "true" }) {
  return (
    <>
      <Notification displayDrawer = {false}/>
      <div className="App">
        <Header />
        {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
        <Footer />
      </div>
    </>
  );
}


export default App;
