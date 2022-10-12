import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { AllDependenciesBuilds, TrackedDependencies } from '../types';
import { getUserDeps } from './api/user';

function MasterDependencies() {
  const [dependencyPrefs, setDependencyPrefs] = useState<null | string>(null);
  const [allDependencies, setAllDependencies] = useState<
    null | AllDependenciesBuilds[]
  >(null);
  const [trackedDependencies, setTrackedDependencies] = useState<
    null | TrackedDependencies[]
  >(null);
  const handleSetTrackedDependencies = () => {};
  useEffect(() => {
    (async () => {
      const response: [string, AllDependenciesBuilds[]] = await getUserDeps();
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
            <MasterDependenciesList dependencyPrefs={dependencyPrefs} />
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
