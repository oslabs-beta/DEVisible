import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import jsonVerify from './utils/jsonVerify';

interface RepoItemDependenciesProps {
  dependencies: string;
}
interface ParsedDependencies {
  name: string;
  version: string;
  isDevDependency: boolean;
}
function RepoItemDependencies({
  dependencies,
}: RepoItemDependenciesProps): JSX.Element {
  //  jsonVerify returns null if argument is empty of invalid JSON
  const parsedDependencies = jsonVerify(dependencies)
    ? jsonVerify(dependencies)
    : [{ name: 'No Dependencies' }];
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {parsedDependencies.map((depRow: ParsedDependencies) => (
              <TableRow>
                <TableCell>{depRow.name}</TableCell>
                <TableCell>{depRow.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RepoItemDependencies;
