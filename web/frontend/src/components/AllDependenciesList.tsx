/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { compareVersions } from 'compare-versions';
import theme from '../theme';
import jsonVerify from './utils/jsonVerify';
import { AllDependenciesBuilds, AddedTrackedDependency } from '../types';

/**
 * @typeParam allDependencies - {@link AllDependenciesBuilds} or null if no dependencies exist
 * @typeParam handleAddToTrackedDependencies - function to add dependency to track
 */
interface AllDependenciesListProps {
  allDependencies: AllDependenciesBuilds[] | null;
  handleAddToTrackedDependencies: (arg: AddedTrackedDependency) => void;
}

/**
 * @typeParam name - string that indicates the name of the dependency
 * @typeParam version - string that indicates the version of the dependency
 * @typeParam repoName - string that indicates the repository which the dependency comes from
 * @typeParam isDevDependency - an optional parameter that is a boolean value of whether or not a dependency is a dev dependency or not
 */
interface Dependencies {
  name: string;
  version: string;
  repoName: string;
  isDevDependency?: boolean;
}

/**
 * @typeParam key - key value pair of strings that indicate a nested dependency
 */
type NestedDependencies = {
  [key: string]: string;
};

/**
 * @typeParam key - key value pair whose value is an array of {@link NestedDependencies}
 */
interface DependencyObject {
  [key: string]: NestedDependencies[];
}

/**
 * function to group repositories based on dependencies with shared versions
 * @param dependencies - {@link Dependencies}, can be undefined in a case of no dependencies or null in case of no nested dependency
 * @returns dependencyObj {@link DependencyObject}
 */
const groupReposOnDependencies = (
  dependencies: (Dependencies | undefined)[] | null
) => {
  const dependencyObj: DependencyObject = {};
  if (dependencies) {
    dependencies.forEach((dependency) => {
      if (dependency) {
        if (!dependencyObj[dependency.name])
          dependencyObj[dependency.name] = [
            { [dependency.repoName]: dependency.version },
          ];
        else {
          dependencyObj[dependency.name] = [
            ...dependencyObj[dependency.name],
            { [dependency.repoName]: dependency.version },
          ];
        }
      }
    });
  }

  return dependencyObj;
};

/**
 * function to render the user's dependency list and handle tracking dependencies
 * @param props - takes in {@link AllDependenciesListProps}
 * @returns JSX.Element
 */
function AllDependenciesList({
  allDependencies,
  handleAddToTrackedDependencies,
}: AllDependenciesListProps) {
  const [open, setOpen] = useState(-1);

  const handleExpandRow = (index: number) => {
    setOpen(open === index ? -1 : index);
  };

  /**
   * function to parse {@link repoNameAndDepVersion} and add a dependency and its version to tracked dependencies
   * @param dependencyName - string that indicates the name of the dependency
   * @param repoNameAndDepVersion - object containing repository name and the selected dependency version
   * @returns void
   */
  const handleAddDep = (
    dependencyName: string,
    repoNameAndDepVersion: NestedDependencies[]
  ) => {
    const versionList: string[] = [];
    Object.values(repoNameAndDepVersion).map((repo: object) =>
      versionList.push(...Object.values(repo))
    );
    let dependencyVersion: string | string[] = versionList[0];

    if (versionList.length > 1) {
      const sortedVersionList = versionList.sort(
        (a: string, b: string) => parseFloat(b) - parseFloat(a)
      );
      [dependencyVersion] = sortedVersionList;
    }

    handleAddToTrackedDependencies({
      name: dependencyName,
      version: dependencyVersion,
    });
  };

  let parsedDependencies: (Dependencies[] | undefined)[] | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let nestedDependencies: DependencyObject | any = null;

  // parse the dependency information
  if (allDependencies) {
    // eslint-disable-next-line consistent-return, array-callback-return
    parsedDependencies = allDependencies?.map((repo: AllDependenciesBuilds) => {
      const result = jsonVerify(repo.builds[repo.builds.length - 1].deps);
      if (result && Array.isArray(result)) {
        return result.map((dep: Omit<Dependencies, 'repoName'>) => {
          return {
            ...dep,
            repoName: repo.name,
          } as Dependencies;
        }); // append repo name to each object of array
      }
    });

    if (parsedDependencies) {
      const flatDependencies = parsedDependencies.flat(); //  combine list of all deps to single list
      nestedDependencies = groupReposOnDependencies(flatDependencies);
    }
  }
  return (
    <div>
      <TableContainer>
        {nestedDependencies ? (
          Object.keys(nestedDependencies).map((depRow, index) => {
            return (
              <React.Fragment key={index}>
                <Table key={index}>
                  <TableBody key={index}>
                    <TableRow key={index}>
                      <TableCell
                        key={index}
                        width="10%"
                        align="left"
                        onClick={() => {
                          handleExpandRow(index);
                        }}
                      >
                        <IconButton key={index.toString() + index}>
                          {open === index ? (
                            <KeyboardArrowUpIcon
                              key={index}
                              sx={{ color: 'primary.main' }}
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              key={index}
                              sx={{ color: 'primary.main' }}
                            />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell
                        key={index.toString() + depRow}
                        width="100%"
                        align="left"
                        onClick={() => {
                          handleExpandRow(index);
                        }}
                      >
                        {depRow}
                      </TableCell>
                      <TableCell
                        key={((index + 1) * -1).toString() + depRow}
                        align="right"
                      >
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleAddDep(depRow, nestedDependencies[depRow])
                          }
                        >
                          <AddIcon key={index} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Collapse
                  key={index.toString() + index.toString()}
                  in={open === index}
                  timeout="auto"
                  unmountOnExit
                >
                  {nestedDependencies ? (
                    nestedDependencies[depRow]
                      .sort(
                        (depA: NestedDependencies, depB: NestedDependencies) =>
                          compareVersions(
                            Object.values(depB)[0],
                            Object.values(depA)[0]
                          )
                      )
                      .map((repo: NestedDependencies, i: number) => (
                        <Table key={(i + index).toString()}>
                          <TableBody key={i}>
                            <TableRow
                              key={(i + index).toString()}
                              sx={{
                                backgroundColor: theme.palette.primary.light,
                              }}
                            >
                              <TableCell
                                key={Object.keys(repo)[0]}
                                width="70%"
                                align="right"
                              >
                                <Typography variant="caption">
                                  {Object.keys(repo)}
                                </Typography>
                              </TableCell>

                              <TableCell
                                key={Object.values(repo)[0]}
                                align="left"
                              >
                                <Typography variant="caption">
                                  {Object.values(repo)}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      ))
                  ) : (
                    <TableCell />
                  )}
                </Collapse>
              </React.Fragment>
            );
          })
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>No Dependencies</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}
export default AllDependenciesList;
