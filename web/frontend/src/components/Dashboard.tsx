import React, { useState } from 'react';
import '../stylesheets/dashboard.css';
import { Grid } from '@mui/material';
import RepoItem from './RepoItem';
import Loader from './Loader';
import mockData from './mocks/mocks';

function Dashboard(): JSX.Element {
  const [mockLoading, setMockLoading] = useState(true); //  used for loader testing
  const numOfRepoCards = mockData.repos.length;
  const repoCards = [];
  for (let i = 0; i < numOfRepoCards; i += 1) {
    repoCards.push(
      <RepoItem
        repoName={mockData.repos[i].name}
        builds={mockData.repos[i].builds}
        key={i}
      />
    );
  }
  const handleStopMockLoading = () => {
    setMockLoading(false);
  };
  setTimeout(handleStopMockLoading, 2000);
  return (
    <div className="dashboard-container">
      {mockLoading ? (
        <Loader color="orange" />
      ) : (
        <Grid display="flex" justifyContent="center" container spacing={2}>
          {repoCards}
        </Grid>
      )}
    </div>
  );
}

export default Dashboard;
