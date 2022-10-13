import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { AllDependenciesBuilds, AddedTrackedDependency } from '../types';
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
    if (!dependencyPrefs) {
      setDependencyPrefs([dependencyToAdd]);
      return;
    }
    if (dependencyPrefs.every((dep) => dep.name !== dependencyToAdd.name)) {
      setDependencyPrefs([...dependencyPrefs, dependencyToAdd]);
    }
  };
  const handleDeleteTrackedDependency = (dependencyName: string) => {
    if (dependencyPrefs) {
      setDependencyPrefs(
        dependencyPrefs.filter((dep) => dep.name !== dependencyName)
      );
    }
  };
  useEffect(() => {
    (async () => {
      const [depPrefsString, listOfAllDeps]: [string, AllDependenciesBuilds[]] =
        await getUserDeps();
      const parsedDepPrefsString = JSON.parse(depPrefsString);
      if (depPrefsString) setDependencyPrefs(parsedDepPrefsString);
      setAllDependencies(listOfAllDeps);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (dependencyPrefs) {
        await postUserDepPrefs(dependencyPrefs);
      }
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
            <MasterDependenciesList
              dependencyPrefs={dependencyPrefs}
              handleDeleteTrackedDependency={handleDeleteTrackedDependency}
            />
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
