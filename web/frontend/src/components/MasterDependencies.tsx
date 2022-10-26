import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography, Switch } from '@mui/material';
import '../stylesheets/dependency-list.css';
import AllDependenciesList from './AllDependenciesList';
import MasterDependenciesList from './MasterDependenciesList';
import { AllDependenciesBuilds, AddedTrackedDependency } from '../types';
import { getUserDeps, postUserDepPrefs } from './api/user';
import theme from '../theme';
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
  const [listView, setListView] = useState(false);

  const [loading, setLoading] = useState<boolean>();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const handleSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListView(event.target.checked);
  };
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

  console.log('width', windowWidth, theme.breakpoints.values.md);
  React.useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      // window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
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
      ) : windowWidth < 900 ? (
        <Paper
          className="dependencies-list-parent-container-mobile"
          elevation={3}
        >
          <Box className="dependencies-container-header-mobile">
            <Box className="header-item-mobile">
              <Typography sx={{ color: 'black', textAlign: 'center' }}>
                {!listView ? (
                  <strong>Tracked Dependencies</strong>
                ) : (
                  'Tracked Dependencies'
                )}
              </Typography>
            </Box>

            <Box className="header-item-slider">
              <Switch onChange={handleSlider} />
            </Box>
            <Box className="header-item-mobile">
              <Typography sx={{ color: 'black', textAlign: 'center' }}>
                {listView ? (
                  <strong>All Dependencies</strong>
                ) : (
                  'All Dependencies'
                )}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {!listView ? (
            <Box className="list-of-tracked-dependencies">
              <MasterDependenciesList
                dependencyPrefs={dependencyPrefs}
                handleDeleteTrackedDependency={handleDeleteTrackedDependency}
                handleUpdateVersion={handleUpdateVersion}
              />
            </Box>
          ) : (
            <Box className="list-of-all-dependencies">
              <AllDependenciesList
                allDependencies={allDependencies}
                handleAddToTrackedDependencies={handleAddToTrackedDependencies}
              />
            </Box>
          )}
        </Paper>
      ) : (
        <Paper className="dependencies-list-parent-container" elevation={3}>
          <Box className="dependencies-child-container">
            <Box className="dependencies-container-header">
              <Typography color="black">Tracked Dependencies</Typography>
            </Box>

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
            <Box className="dependencies-container-header">
              <Typography color="black">All Dependencies</Typography>
            </Box>
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
