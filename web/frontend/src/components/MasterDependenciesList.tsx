import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import { AddedTrackedDependency } from '../types';

interface MasterDependenciesListProps {
  dependencyPrefs: AddedTrackedDependency[];
}
function MasterDependencies({ dependencyPrefs }: MasterDependenciesListProps) {
  console.log(dependencyPrefs);
  // let parsedDependencies = null;
  // if (dependencyPrefs) {
  //   parsedDependencies = JSON.parse(dependencyPrefs);
  //   parsedDependencies = JSON.parse(parsedDependencies);
  //   console.log('Masterparse', parsedDependencies);
  // }
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencyPrefs ? (
              dependencyPrefs?.map((depRow) => (
                <TableRow>
                  <TableCell>{depRow.name}</TableCell>
                  <TableCell>{depRow.version}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Tracked Dependencies</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default MasterDependencies;
