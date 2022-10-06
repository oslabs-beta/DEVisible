import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

interface RepoItemDependenciesProps {
  dependencies: string;
}
function RepoItemDependencies({
  dependencies,
}: RepoItemDependenciesProps): JSX.Element {
  const parsedDependencies = JSON.parse(dependencies);
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {Object.keys(parsedDependencies).map((depRow) => (
              <TableRow>
                <TableCell>{depRow}</TableCell>
                <TableCell>{parsedDependencies[depRow]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RepoItemDependencies;