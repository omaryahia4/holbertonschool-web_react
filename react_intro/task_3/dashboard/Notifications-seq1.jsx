import './Notifications.css';
import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils';

function Notifications() {
  const buttonStyle = {
    position: 'absolute',
    right: '-480px',
    top: '-475px',
    transform: 'scale(0.012)',
    border: 'none',
    cursor: 'pointer',
    background: 'transparent',
  };
  return (
    <div className='Notifications'>
      <p>Here is the list of notifications</p>
      <button 
        aria-label='Close'
        onClick={() => console.log('Hello Holbies')}
        style={buttonStyle}
      >
        <img src={closeIcon} alt='close icon' />
      </button>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li 
          data-priority="urgent" dangerouslySetInnerHTML={{__html: getLatestNotification()}}
        ></li>
      </ul>
    </div>
  )
}

export default Notifications; // Should FAIL