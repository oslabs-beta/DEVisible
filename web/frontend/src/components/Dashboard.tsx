import React, { useEffect, useState } from 'react';
import '../stylesheets/dashboard.css';
import { Grid, Box } from '@mui/material';
import RepoItem from './RepoItem';
import Loader from './Loader';
import { getUserInfoApi } from './api/user';
import { GetUserInfo } from '../types';
import mockData from './mocks/mocks';
import SearchBar from './SearchBar';

function Dashboard(): JSX.Element {
  const [data, setData] = useState<GetUserInfo[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await getUserInfoApi(10);
      setData(response);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);
  // FOR TESTING DISREGARD ERROR
  const reposTiles = [];
  for (let i = 0; i < 100; i += 1) {
    reposTiles.push(
      <RepoItem
        repoName={mockData.repos[0].name}
        builds={mockData.repos[0].builds}
        key={mockData.repos[0].id}
      />
    );
  }
  //  END OF TESTING
  return (
    <Box overflow="auto" className="dashboard-container" flex={1}>
      <SearchBar />
      {loading ? (
        <Box className="loader-container">
          <Loader color="orange" />
        </Box>
      ) : (
        <Box overflow="auto" className="repo-tiles-grid">
          <Grid justifyContent="center" container>
            {data?.map((repo: GetUserInfo) => (
              <RepoItem
                repoName={repo.name}
                builds={repo.builds}
                key={repo.id}
              />
            ))}
            {/* FOR TESTING */}
            {reposTiles}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
