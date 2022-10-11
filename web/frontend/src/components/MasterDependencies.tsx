import React, { useEffect } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { User } from '../types';
import { getUserDeps } from './api/user';

interface MasterDependenciesProps {
  user: User | null;
  dependencies: string[] | null;
}
function MasterDependencies({ user, dependencies }: MasterDependenciesProps) {
  useEffect(() => {
    (async () => {
      const response = await getUserDeps();
      console.log('resHere', response);
    })();
  }, []);
  return (
    <Box bgcolor="primary.light" className="dependencies-page-container">
      <Paper className="dependencies-list-parent-container" elevation={3}>
        <Box className="dependencies-child-container">
          <Typography
            // bgcolor="secondary.main"
            className="dependencies-container-header"
          >
            Tracked Dependencies
          </Typography>
          <Divider />
          <Box className="list-of-tracked-dependencies">
            <MasterDependenciesList user={user} />
          </Box>
        </Box>
        <Box className="dependencies-child-container">
          <Typography className="dependencies-container-header">
            All Dependencies
          </Typography>
          <Divider />
          <Box className="list-of-all-dependencies">
            <AllDependenciesList dependencies={dependencies} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MasterDependencies;
