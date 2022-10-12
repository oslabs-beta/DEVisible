import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { AllDependenciesBuilds, DepPrefsResponse } from '../types';
import { getUserDeps } from './api/user';

// interface MasterDependenciesProps {
//   user: User | null;
// }
function MasterDependencies() {
  const [dependencyPrefs, setDependencyPrefs] = useState<null | object>(null);
  const [allDependencies, setAllDependencies] = useState<
    null | AllDependenciesBuilds[]
  >(null);
  useEffect(() => {
    (async () => {
      const response: [DepPrefsResponse, AllDependenciesBuilds[]] =
        await getUserDeps();
      setDependencyPrefs(response[0]);
      setAllDependencies(response[1]);
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
            <MasterDependenciesList user={dependencyPrefs} />
          </Box>
        </Box>
        <Box className="dependencies-child-container">
          <Typography className="dependencies-container-header">
            All Dependencies
          </Typography>
          <Divider />
          <Box className="list-of-all-dependencies">
            <AllDependenciesList allDependencies={allDependencies} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MasterDependencies;
