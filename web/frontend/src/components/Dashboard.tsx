import React, { useEffect, useState } from 'react';
import '../stylesheets/dashboard.css';
import { Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';
import RepoItem from './RepoItem';
import Loader from './Loader';
import { getUserInfoApi } from './api/user';
import { GetUserInfo, User } from '../types';

interface Props {
  user: User | null;
}

function Dashboard({ user }: Props): JSX.Element {
  const [data, setData] = useState<GetUserInfo[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await getUserInfoApi(10);
      setData(response);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="dashboard-container">
      {loading ? (
        <Loader color="orange" />
      ) : (
        <Grid display="flex" justifyContent="center" container spacing={2}>
          {data?.map((repo: GetUserInfo) => (
            <RepoItem repoName={repo.name} builds={repo.builds} key={repo.id} />
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Dashboard;
