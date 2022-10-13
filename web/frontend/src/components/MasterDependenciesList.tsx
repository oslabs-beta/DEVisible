/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AddedTrackedDependency } from '../types';

interface MasterDependenciesListProps {
  dependencyPrefs: AddedTrackedDependency[] | null;
  handleDeleteTrackedDependency: (depName: string) => void;
}
function MasterDependencies({
  dependencyPrefs,
  handleDeleteTrackedDependency,
}: MasterDependenciesListProps) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencyPrefs ? (
              dependencyPrefs.map((depRow, index) => (
                <TableRow key={index}>
                  <TableCell key={index} width="35%">
                    {depRow.name}
                  </TableCell>
                  <TableCell key={(index + 1) * -1} align="left" width="60%">
                    {depRow.version}
                  </TableCell>

                  <TableCell key={`-${index.toString()}`} align="center">
                    <IconButton
                      key={index}
                      color="primary"
                      onClick={() => handleDeleteTrackedDependency(depRow.name)}
                    >
                      <DeleteIcon key={index} />
                    </IconButton>
                  </TableCell>
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
