import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

interface MasterDependenciesListProps {
  dependencyPrefs: string | null;
}
function MasterDependencies({ dependencyPrefs }: MasterDependenciesListProps) {
  // console.log(dependencyPrefs);
  let parsedDependencies = null;
  if (dependencyPrefs) {
    parsedDependencies = JSON.parse(dependencyPrefs);
    parsedDependencies = JSON.parse(parsedDependencies);
    console.log('parse', parsedDependencies);
  }
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {/* {Array.isArray(parsedDependencies) ? (
              parsedDependencies?.map((depRow) => (
                <TableRow>
                  <TableCell>{depRow.name}</TableCell>
                  <TableCell>{depRow.version}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Tracked Dependencies</TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default MasterDependencies;
