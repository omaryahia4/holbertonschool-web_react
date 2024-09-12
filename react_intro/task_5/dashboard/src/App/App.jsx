import HolbertonLogo from '../assets/holberton-logo.jpg';
import './App.css'
import { getFullYear, getFooterCopy } from '../utils/utils';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <img className='App-logo' src={HolbertonLogo} alt='holberton logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <label className='email'>
          Email:
        </label>
        <input type='email'/>
        <label className='password'>
          Password: 
        </label>
        <input type='password'/>
        <button className='label-button'>OK</button>
      </div>
      <div className='App-footer'>
        <p> Copyright {getFullYear()} {getFooterCopy()}</p>
      </div>
    </div>
  );
}

export default App;