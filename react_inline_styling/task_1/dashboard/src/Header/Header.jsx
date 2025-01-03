import React from 'react';
import HolbertonLogo from '../assets/holbertonlogo.jpg';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  appHeader: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: '#e0454b',
  },
  appLogo: {
    height: '30vmin',
    marginRight: '10px',
  },
});

export default function Header() {
  return (
    <div className={css(styles.appHeader)}>
      <img className={css(styles.appLogo)} src={HolbertonLogo} alt="holberton logo" />
      <h1>School dashboard</h1>
    </div>
  );
}
