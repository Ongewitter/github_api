import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputLabel from './components/InputLabel';
import TextInput from './components/TextInput';
import RepositoryTable from './components/repositories/RepositoryTable';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    //TODO: Don't forget to debounce userName changes
    //TODO: Look into mocking this so github doesn't complain
    fetch(`https://api.github.com/users/${userName}/repos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(repositories => {
        //TODO Figure out what the response is like
        setRepositories(repositories);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userName]);

  return (
    <div className="App">
      <InputLabel>
        Name:
        <TextInput name="name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </InputLabel>

      { (repositories.length > 0) ? <RepositoryTable repositories={repositories}/> : '' }

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
