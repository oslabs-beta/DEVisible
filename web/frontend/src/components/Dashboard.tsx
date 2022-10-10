import React, { useEffect, useState } from 'react';
import '../stylesheets/dashboard.css';
import { Grid, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import RepoItem from './RepoItem';
import Loader from './Loader';
import { getUserInfoApi } from './api/user';
import { GetUserInfo, User } from '../types';
import SearchBar from './SearchBar';
// import mockData from './mocks/mocks'; //  FOR TESTING

interface Props {
  user: User | null;
}

function Dashboard({ user }: Props): JSX.Element {
  const [data, setData] = useState<GetUserInfo[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    (async () => {
      const response = await getUserInfoApi(user.id);
      setData(response);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [user]);
  // FOR TESTING DISREGARD ERROR
  // const reposTiles = [];
  // for (let i = 0; i < 100; i += 1) {
  //   reposTiles.push(
  //     <RepoItem
  //       repoName={mockData.repos[0].name}
  //       builds={mockData.repos[0].builds}
  //       key={mockData.repos[0].id}
  //     />
  //   );
  // }
  //  END OF TESTING
  if (!user) return <Navigate to="/login" />;
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
                data={data}
                setData={setData}
              />
            ))}
            {/* FOR TESTING */}
            {/* {reposTiles} */}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
