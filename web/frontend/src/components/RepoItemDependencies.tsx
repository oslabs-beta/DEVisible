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
const jsonVerify = (dependencies: string) => {
  if (!dependencies) return { 'No Dependencies': '' };
  try {
    return JSON.parse(JSON.stringify(dependencies));
  } catch {
    return { 'No Dependencies': '' };
  }
};
function RepoItemDependencies({
  dependencies,
}: RepoItemDependenciesProps): JSX.Element {
  const parsedDependencies = jsonVerify(dependencies);
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
