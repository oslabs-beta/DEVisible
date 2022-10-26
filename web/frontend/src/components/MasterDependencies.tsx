import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { AllDependenciesBuilds, AddedTrackedDependency } from '../types';
import { getUserDeps, postUserDepPrefs } from './api/user';
import Loader from './Loader';

/**
 * parent component function to render {@link AllDependenciesList} and {@link MasterDependenciesList}
 * @returns JSX.Element
 */
function MasterDependencies() {
  const [dependencyPrefs, setDependencyPrefs] = useState<
    AddedTrackedDependency[] | null
  >(null);
  const [allDependencies, setAllDependencies] = useState<
    null | AllDependenciesBuilds[]
  >(null);

  const [loading, setLoading] = useState<boolean>();

  /**
   * function to add dependencies to the tracked dependencies list
   * @param dependencyToAdd - dependency to add to tracked dependencies list
   * @returns void
   */
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

  /**
   * function to delete dependencies from the tracked dependencies list
   * @param dependencyName - dependency to delete
   * @returns void
   */
  const handleDeleteTrackedDependency = (dependencyName: string) => {
    if (dependencyPrefs) {
      setDependencyPrefs(
        dependencyPrefs.filter((dep) => dep.name !== dependencyName)
      );
    }
  };

  /**
   * function to update the version of the dependency to track
   * @param dependencyName - string that indicates the name of dependency
   * @param newVersion - string that indicates the version of the dependency to update to
   */
  const handleUpdateVersion = (dependencyName: string, newVersion: string) => {
    if (dependencyPrefs) {
      const copyDepPrefs = [...dependencyPrefs];
      const updateIndex = copyDepPrefs.findIndex(
        (dep) => dep.name === dependencyName
      );
      copyDepPrefs[updateIndex] = { name: dependencyName, version: newVersion };
      setDependencyPrefs(copyDepPrefs);
    }
  };

  // check if user has dependencies to render
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [depPrefsString, listOfAllDeps]: [string, AllDependenciesBuilds[]] =
        await getUserDeps();
      const parsedDepPrefsString = JSON.parse(depPrefsString);
      if (depPrefsString) setDependencyPrefs(parsedDepPrefsString);
      setAllDependencies(listOfAllDeps);
      setLoading(false);
    })();
  }, []);

  // update dependency tracking
  useEffect(() => {
    (async () => {
      if (dependencyPrefs) {
        await postUserDepPrefs(dependencyPrefs);
      }
    })();
  }, [dependencyPrefs]);

  return (
    <Box bgcolor="primary.light" className="dependencies-page-container">
      {loading ? (
        <Box sx={{ alignSelf: 'center' }}>
          <Loader color="blue" />
        </Box>
      ) : (
        <Paper className="dependencies-list-parent-container" elevation={3}>
          <Box className="dependencies-child-container">
            <Typography color="black" className="dependencies-container-header">
              Tracked Dependencies
            </Typography>
            <Divider />
            <Box className="list-of-tracked-dependencies">
              <MasterDependenciesList
                dependencyPrefs={dependencyPrefs}
                handleDeleteTrackedDependency={handleDeleteTrackedDependency}
                handleUpdateVersion={handleUpdateVersion}
              />
            </Box>
          </Box>
          <Box className="dependencies-child-container">
            <Typography color="black" className="dependencies-container-header">
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
      )}
    </Box>
  );
}

export default MasterDependencies;
