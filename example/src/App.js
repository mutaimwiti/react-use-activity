import { useState } from 'react';
import { useActivity } from 'react-use-activity';

import './App.css';
import logo from './logo.svg';

function App() {
  const [visible, setVisible] = useState(true);

  useActivity({
    timeout: 1000,
    activityEvents: 'mousemove',
    onActivity: () => setVisible(true),
    onInactivity: () => setVisible(false),
  });

  return (
    <div className="App">
      <header className="App-header">
        {visible &&<img src={logo} className="App-logo" alt="logo" />}
        <p>
          I will disappear after a second of mouse inactivity and only re-appear when there's activity
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
