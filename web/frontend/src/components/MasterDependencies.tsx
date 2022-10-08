import React from 'react';
import { Box } from '@mui/system';
import '../stylesheets/dependency-list.css';

interface MasterDependenciesProps {
  depsPrefs: string;
  deps: string;
}
function MasterDependencies({}: // depsPrefs,
// deps,
MasterDependenciesProps): JSX.Element {
  return <Box className="dependencies-list">Deps</Box>;
}

export default MasterDependencies;
