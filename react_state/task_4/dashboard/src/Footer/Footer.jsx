import React, { useContext } from 'react';
import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { newContext } from '../Context/context';

export default function Footer() {
  const { user } = useContext(newContext);

  return (
    <div className='App-footer'>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
      
      {user.isLoggedIn && (
        <p>
          <a href="">Contact us</a>
        </p>
      )}
    </div>
  );
}
