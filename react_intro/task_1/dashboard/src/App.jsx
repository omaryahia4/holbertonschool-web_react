import HolbertonLogo from './assets/holbertonlogo.jpg';
import './App.css'
import { getFullYear, getFooterCopy } from './utils';
import Notifications from './Notifications';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <img className='App-logo' src={HolbertonLogo} alt='logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>
      <div className='App-footer'>
        <p> Copyright {getFullYear()} {getFooterCopy()}</p>
      </div>
    </div>
  );
}

export default App;