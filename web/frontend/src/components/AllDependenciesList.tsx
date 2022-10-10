import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import jsonVerify from './utils/jsonVerify';

interface AllDependenciesListProps {
  dependencies: string;
}
const nestDependencies = (dependencies: object) => {
  console.log('here', dependencies);
  const nestedDependencies = dependencies;
  return nestedDependencies;
};
function AllDependenciesList({ dependencies }: AllDependenciesListProps) {
  //  jsonVerify returns null if argument is empty of invalid JSON
  const parsedDependencies = jsonVerify(dependencies)
    ? jsonVerify(dependencies)
    : { 'No Dependencies': '' };
  const nestedDependencies = nestDependencies(parsedDependencies);
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {Object.keys(nestedDependencies[0]).map((depRow) => (
              <TableRow>
                <TableCell>{depRow}</TableCell>
                <TableCell>{nestedDependencies[depRow]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AllDependenciesList;
