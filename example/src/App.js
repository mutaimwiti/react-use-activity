import { useState } from 'react';

import { useActivity } from '../../src';

import './App.css';
import logo from './logo.svg';


function App() {
  const [visible, setVisible] = useState(true);

  useActivity({
    onActivity: () => setVisible(true),
    onInactivity: () => setVisible(false),
    timeout: 'mousemove',
  });

  return (
    <div className="App">
      <header className="App-header">
        {visible &&<img src={logo} className="App-logo" alt="logo" />}
        <p>
          The logo will dissapear after 3 seconds of mouse inactivity and only re-appear when there's activity
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
