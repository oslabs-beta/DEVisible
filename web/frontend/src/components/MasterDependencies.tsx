import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import '../stylesheets/dependency-list.css';
import mockData from './mocks/mocks';
import AllDependenciesList from './AllDependenciesList';

interface MasterDependenciesProps {
  depsPrefs: string;
  deps: string;
}
function MasterDependencies({
  depsPrefs,
  deps,
}: // depsPrefs,
// deps,
MasterDependenciesProps) {
  const dummyBuild = mockData.repos[0].builds;
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
        </Box>
        <Box className="dependencies-child-container">
          <Typography className="dependencies-container-header">
            All Dependencies
          </Typography>
          <Divider />
          <Box className="list-of-all-dependencies">
            {/* <AllDependenciesList
              dependencies={dummyBuild[0].deps as unknown as string}
            /> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MasterDependencies;
