/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import jsonVerify from './utils/jsonVerify';

/**
 * @typeParam outOfSpecDeps - array of strings that indicate out of spec dependencies
 * @typeParam dependencies - string consisting of dependencies
 */
interface RepoItemDependenciesProps {
  outOfSpecDeps: string[];
  dependencies: string;
}

/**
 * @typeParam name - string that indicates name of dependency
 * @typeParam version - string that indicates the version of the dependency
 * @typeParam isDevDependency - boolean that indicates whether a dependency is a dev dependency or not
 */
interface ParsedDependencies {
  name: string;
  version: string;
  isDevDependency: boolean;
}

/**
 * function that renders container of repositories' dependencies
 * @param props - take in {@link RepoItemDependenciesProps}
 * @returns JSX.Element
 */
function RepoItemDependencies({
  outOfSpecDeps,
  dependencies,
}: RepoItemDependenciesProps): JSX.Element {
  //  jsonVerify returns null if argument is empty of invalid JSON
  const parsedDependencies = Array.isArray(jsonVerify(dependencies))
    ? jsonVerify(dependencies)
    : [{ name: 'No Dependencies' }];

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {parsedDependencies.map(
              (depRow: ParsedDependencies, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: outOfSpecDeps.includes(depRow.name)
                      ? 'error.main'
                      : '',
                  }}
                >
                  <TableCell key={index}>{depRow.name}</TableCell>
                  <TableCell key={(index + 1) * -1}>{depRow.version}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default RepoItemDependencies;
