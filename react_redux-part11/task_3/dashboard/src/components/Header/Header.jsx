import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import HolbertonLogo from '../../assets/holbertonlogo.jpg';
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../../features/auth/authSlice';

const styles = StyleSheet.create({
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: '#e0454b',
  },
  logo: {
    height: '30vmin',
  },
  logoutSection: {
    marginLeft: '20px',
  },
});

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={css(styles.header)}>
      <img className={css(styles.logo)} src={HolbertonLogo} alt="holberton logo" />
      <h1>School dashboard</h1>
      {isLoggedIn && ( 
        <div className={css(styles.logoutSection)} id="logoutSection">
          Welcome <b>{user.email}</b> <a href="#" onClick={handleLogout}>(logout)</a>
        </div>
      )}
    </div>
  );
};

export default Header;