import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import jsonVerify from './utils/jsonVerify';

interface MasterDependenciesProps {
  user: User | null;
}
function MasterDependencies({ user }: MasterDependenciesProps) {
  let parsedDependencies = null;
  if (user) {
    parsedDependencies = JSON.parse(user.depPrefs);
    parsedDependencies = JSON.parse(parsedDependencies);
  }
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {Array.isArray(parsedDependencies) ? (
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default MasterDependencies;
