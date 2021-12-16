import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import usePageBottom from './utils/usePageBottom';
import fetchGet from './utils/fetchData';
import RepositoriesTable from './components/RepositoriesTable';
import CommitsTable from './components/CommitsTable';

function App() {
  const BASE_GITHUB_URL = 'https://api.github.com';
  const [repositories, setRepositories] = useState([]);
  const [repositoryName, setRepositoryName] = useState('');
  const [commits, setCommits] = useState([]);
  const [showCommits, setShowCommits] = useState(false);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [commitFilter, setCommitFilter] = useState('');
  const [commitPage, setCommitPage] = useState(1);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isPageBottom = usePageBottom();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    setShowCommits(commits.length > 0);
  }, [commits]);

  useEffect(() => {
    if (!showCommits) { return; }

    const debounceFilterCommits = setTimeout(() => filterCommits(), 500);
    return () => clearTimeout(debounceFilterCommits);
  }, [commitFilter]);

  function filterCommits() {
    if (commits.length <= 0) { return; }
    if (commitFilter.length <= 0) { return setFilteredCommits(commits); }

    const filteredCommits = commits.filter((commit) => {
      return commit.sha.includes(commitFilter) ||
             commit.commit.author.name.includes(commitFilter) ||
             commit.commit.author.date.includes(commitFilter) ||
             commit.commit.message.includes(commitFilter);
    });
    setFilteredCommits(filteredCommits);
  }

  useEffect(() => {
    if (!repositoryName || commitPage > 2) { return; }
    if(!isPageBottom && commitPage !== 1) { return; }

    getCommits();
  }, [isPageBottom, repositoryName]);

  function handleSearchClicked() {
    setShowCommits(false);
    getRepositories();
  }

  async function getRepositories() {
    setLoading(true);
    await fetchGet({
      url: `${BASE_GITHUB_URL}/users/${userName}/repos`,
      success: setRepositories,
      error: setError
    }).then(() => {
      resetDefaultValues();
    });
  }

  async function getCommits() {
    console.log(repositoryName, userName);
    setLoading(true);
    await fetchGet({
      url: `${BASE_GITHUB_URL}/repos/${userName}/${repositoryName}/commits?page=${commitPage}&per_page=20`,
      success: (response) => { setCommits(commits.concat(response)) },
      fail: setError
    }).then(() => {
      setLoading(false);
      setCommitFilter('');
      setCommitPage(commitPage + 1);
    });
  }

  function handleRepositoryClicked(repositoryName) {
    setRepositoryName(repositoryName);
  }

  function handleBack() {
    if (showCommits) {
      resetDefaultValues();
    }
  }

  function resetDefaultValues() {
    setLoading(false)
    setCommitPage(1);
    setCommits([]);
    setCommitFilter('');
  }

  function renderTable() {
    if (showCommits) {
      return (
        <React.Fragment>
          <SearchWrapper>
            <BiggerButton 
              variant="contained"
              onClick={() => handleBack()}>
                Back
            </BiggerButton>
            <TextField
              id="standard-basic"
              label="Filter Commits"
              value={commitFilter}
              onChange={(e) => setCommitFilter(e.target.value)}/>
          </SearchWrapper>
          <CommitsTable commits={filteredCommits}/>
        </React.Fragment>
      );
    } else {
      return (<RepositoriesTable
                repositories={repositories}
                onRepositoryClicked={handleRepositoryClicked}/>);
    }
  }

  return (
    <Container fixed>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        { (error) ? (<Alert severity="error">error.message</Alert>) : '' }
        <SearchWrapper>
          <TextField
            id="standard-basic"
            label="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}/>
          <BiggerButton
            variant="contained"
            disabled={loading}
            onClick={() => handleSearchClicked()}>
              Search for user
          </BiggerButton>
        </SearchWrapper>
        { (loading) ? <LinearProgress /> : '' }
        {renderTable()}
      </ThemeProvider>
    </Container>
  );
}

export default App;

const SearchWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;

const BiggerButton = styled(Button)`
  height: 56px;
`;
