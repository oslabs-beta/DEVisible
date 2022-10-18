/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import '../stylesheets/dashboard.css';
import { Grid, Box, Divider, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import RepoItem from './RepoItem';
import Loader from './Loader';
import { getUserDeps, getUserInfoApi } from './api/user';
import { GetUserInfo, OutOfSpecRepos, OutOfSpecDeps, User } from '../types';
import SearchBar from './SearchBar';
import theme from '../theme';
import Footer from './Footer';
import findOutOfSpecRepos from './utils/findOutOfSpecRepos';

interface Props {
  user: User | null;
}

function Dashboard({ user }: Props): JSX.Element {
  const [data, setData] = useState<GetUserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  // state that will be updated by search value typed into SearchBar component
  const [searchValue, setSearchValue] = useState('');

  const [outOfSpecRepos, setOutOfSpecRepos] = useState<OutOfSpecRepos>({});
  let repoOutOfSpecStatus: OutOfSpecDeps = {
    status: false,
    depsOutOfSpec: [],
  };
  useEffect(() => {
    if (!user) return;
    (async () => {
      const response = await getUserInfoApi();
      const [preferredDeps, allDependencies] = await getUserDeps();
      setOutOfSpecRepos(findOutOfSpecRepos(preferredDeps, allDependencies));
      setData(response);
      setLoading(false);
    })();
  }, [user]);
  // function for handling click of delete button within individual repo components
  const deleteRepo = async (repoId: number): Promise<void> => {
    // make axios delete request to server
    const deleteResponse = await axios.delete(`/webAPI/repo/${repoId}`);
    if (deleteResponse.status === 204 && data !== undefined) {
      const repoIndex = data.findIndex((repo) => repo.id === repoId);
      // store data state in a new label to be able to change it
      const newData = [...data];
      newData.splice(repoIndex, 1);
      // remove repo at the predetermined repoIndex that was found where repoId matched target repoId
      setData(newData);
    }
  };

  const handleSearch = () => {
    if (data) {
      return data.filter((repo) =>
        repo.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    // otherwise if there is no data (it is falsy), need to specify return value for linting
    return [];
  };

  // declare quoted command in a variable to avoid security vulnerability associated with someone potentially escaping the quotations
  const buildCommand = '"npm run build"';
  console.log(data);
  if (!user) return <Navigate to="/login" />;
  if (!loading && data?.length === 0)
    return (
      <div className="emptyRepoContainer">
        <Box className="emptyRepoContent" bgcolor="primary.main">
          <Typography id="header" color="white">
            No repos have been added yet!
          </Typography>
          <Divider sx={{ bgcolor: 'secondary.light' }} />
          <div className="bottomContainer">
            <div className="instructions">
              <Typography color="secondary.light">
                To add a repo, grab your API key from the{' '}
                <Link
                  style={{ color: theme.palette.primary.light }}
                  to="/account"
                >
                  User Page
                </Link>{' '}
                and invoke the DEVisible application using it.
              </Typography>
            </div>
            <div className="code">
              <Box bgcolor={theme.palette.primary.light} className="codeBox">
                <code>
                  node devisible.js --apiKey api_key_goes_here --buildPath
                  dist/--command {buildCommand}
                </code>
              </Box>
            </div>
          </div>
        </Box>
      </div>
    );
  // conditionally render search bar based on number of repos in state
  const searchbar =
    data === undefined || data.length < 12 ? null : (
      <div className="searchContainer">
        <SearchBar setSearchValue={setSearchValue} />
      </div>
    );

  return (
    <>
      <Box overflow="auto" className="dashboard-container" flex={1}>
        {loading ? (
          <Box className="loader-container">
            <Loader color="orange" />
          </Box>
        ) : (
          <Box overflow="auto" className="repo-tiles-grid">
            <div className="search">{searchbar}</div>
            <Grid justifyContent="center" container>
              {handleSearch().map((repo: GetUserInfo) => {
                if (outOfSpecRepos[repo.id]) {
                  repoOutOfSpecStatus = {
                    status: true,
                    depsOutOfSpec: outOfSpecRepos[repo.id],
                  };
                } else {
                  repoOutOfSpecStatus = {
                    status: false,
                    depsOutOfSpec: [],
                  };
                }
                return (
                  <RepoItem
                    repoOutOfSpecInfo={repoOutOfSpecStatus}
                    repoName={repo.name}
                    builds={repo.builds}
                    key={repo.id}
                    deleteRepo={deleteRepo}
                  />
                );
              })}
            </Grid>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default Dashboard;
