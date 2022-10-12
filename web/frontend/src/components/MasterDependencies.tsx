import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import {
  AllDependenciesBuilds,
  TrackedDependencies,
  AddedTrackedDependency,
} from '../types';
import { getUserDeps, postUserDepPrefs } from './api/user';

function MasterDependencies() {
  const [dependencyPrefs, setDependencyPrefs] = useState<
    null | AddedTrackedDependency[]
  >(null);
  const [allDependencies, setAllDependencies] = useState<
    null | AllDependenciesBuilds[]
  >(null);
  const handleAddToTrackedDependencies = (
    dependencyToAdd: AddedTrackedDependency
  ) => {
    if (!dependencyPrefs) setDependencyPrefs([dependencyToAdd]);
    else {
      setDependencyPrefs([...dependencyPrefs, dependencyToAdd]);
    }
  };
  useEffect(() => {
    (async () => {
      const [depPrefsString, listOfAllDeps]: [string, AllDependenciesBuilds[]] =
        await getUserDeps();
      const parsedDepPrefsString = JSON.parse(JSON.parse(depPrefsString));
      if (depPrefsString) setDependencyPrefs(parsedDepPrefsString);
      setAllDependencies(listOfAllDeps);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      console.log('entered');
      // const response = await postUserDepPrefs();
    })();
  }, [dependencyPrefs]);
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
            <AllDependenciesList
              allDependencies={allDependencies}
              handleAddToTrackedDependencies={handleAddToTrackedDependencies}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MasterDependencies;
