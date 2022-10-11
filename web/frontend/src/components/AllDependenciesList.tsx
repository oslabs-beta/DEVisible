import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import jsonVerify from './utils/jsonVerify';

interface AllDependenciesListProps {
  dependencies: string[] | null;
}
const nestDependencies = (dependencies: object) => {
  const nestedDependencies = dependencies;
  return nestedDependencies;
};
function AllDependenciesList({ dependencies }: AllDependenciesListProps) {
  let parsedDependencies = null;
  if (dependencies) {
    parsedDependencies = dependencies?.map((buildDeps: string) =>
      jsonVerify(buildDeps)
    );
    parsedDependencies = parsedDependencies.flat(); //  combine list of all deps to single list
  }
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencies ? (
              parsedDependencies?.map((depRow) => (
                <TableRow>
                  <TableCell>{depRow.name}</TableCell>
                  <TableCell>{depRow.version}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Dependencies</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AllDependenciesList;
