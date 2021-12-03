import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import InputLabel from './components/InputLabel';
import TextInput from './components/TextInput';
import RepositoriesTable from './components/repositories/RepositoriesTable';
import CommitsTable from './components/repositories/CommitsTable';

function App() {
  const BASE_GITHUB_URL = 'https://api.github.com/';
  const [repositories, setRepositories] = useState([]);
  const [commits, setCommits] = useState([]);
  const [userName, setUserName] = useState('');

  function handleSearchClicked() {
    getRepositories(userName);
  }

  function getRepositories(userName) {
    //TODO: Make this a generic fetch method
    //TODO: Look into mocking this so github doesn't complain
    fetch(`${BASE_GITHUB_URL}/users/${userName}/repos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(repositories => {
        //TODO Figure out what the response is like
        // https://api.github.com/users/Ongewitter/repos
        setRepositories(repositories);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleRepositoryClick(repositoryName) {
    getCommits(userName, repositoryName);
  }

  function getCommits(userName, repositoryName) {
    //TODO: Look into mocking this so github doesn't complain
    fetch(`${BASE_GITHUB_URL}/repos/${userName}/${repositoryName}/commits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(commits => {
        //TODO Figure out what the response is like
        // https://api.github.com/users/Ongewitter/repos
        setCommits(commits);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <InputLabel>
        Name:
        <TextInput name="name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </InputLabel>
      <button onClick={() => handleSearchClicked()}>Search for user</button>

      { (repositories.length > 0) ? <RepositoriesTable repositories={repositories} onRepositoryClick={handleRepositoryClick}/> : '' }
      { (commits.length > 0) ? <CommitsTable commits={commits}/> : '' }

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
