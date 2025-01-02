import React from 'react';
import WithLogging from '../HOC/WithLogging';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  appBody: {
    borderTop: 'solid',
    borderBottom: 'solid',
    borderColor: '#e0454b',
    minHeight: '50vmax',
    padding: '30px',
  },
  email: {
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },
  password: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },
  labelButton: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },
});

export function Login() {
  return (
    <div className={`${css(styles.appBody)} App-body`}>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email" className={css(styles.email)}>
        Email:
        <input id="email" type="email" />
      </label>

      <label htmlFor="password" className={css(styles.password)}>
        Password:
        <input id="password" type="password" />
      </label>

      <button className={css(styles.labelButton)}>OK</button>
    </div>
  );
}

export default WithLogging(Login);
