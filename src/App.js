import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import RepositoriesTable from './components/repositories/RepositoriesTable';
import CommitsTable from './components/commits/CommitsTable';

function App() {
  const BASE_GITHUB_URL = 'https://api.github.com';
  const [repositories, setRepositories] = useState([]);
  const [commits, setCommits] = useState([]);
  const [showCommits, setShowCommits] = useState(false);
  const [userName, setUserName] = useState('');
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    setShowCommits(commits.length > 0);
  }, [commits]);

  function handleSearchClicked() {
    setShowCommits(false);
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
        setCommits(commits);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (  
    <Container fixed>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <SearchWrapper>
          <TextField
            id="standard-basic"
            label="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}/>
          <InputButton
            variant="contained"
            onClick={() => handleSearchClicked()}>
              Search for user
          </InputButton>
        </SearchWrapper>
        {(showCommits) ? 
          <CommitsTable commits={commits}/> :
          <RepositoriesTable
            repositories={repositories}
            onRepositoryClick={handleRepositoryClick}/>
        }
      </ThemeProvider>
    </Container>
  );
}

export default App;

const SearchWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;

const InputButton = styled(Button)`
  height: 56px;
`;
