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
import theme from '../theme';
import jsonVerify from './utils/jsonVerify';
import { AllDependenciesBuilds, AddedTrackedDependency } from '../types';

interface AllDependenciesListProps {
  allDependencies: AllDependenciesBuilds[] | null;
  handleAddToTrackedDependencies: (arg: AddedTrackedDependency) => void;
}
interface Dependencies {
  name: string;
  version: string;
  repoName: string;
  isDevDependency?: boolean;
}
type NestedDependencies = {
  [key: string]: string;
};
interface NestedDependenciesResult {
  [key: string]: NestedDependencies[];
}
// TODO refactor TS
const nestDependencies = (
  dependencies: (Dependencies | undefined)[] | null
) => {
  const nestedDependencies: NestedDependenciesResult = {};
  if (dependencies) {
    dependencies.forEach((dependency) => {
      if (dependency) {
        if (!nestedDependencies[dependency.name])
          nestedDependencies[dependency.name] = [
            { [dependency.repoName]: dependency.version },
          ];
        else {
          nestedDependencies[dependency.name] = [
            ...nestedDependencies[dependency.name],
            { [dependency.repoName]: dependency.version },
          ];
        }
      }
    });
  }

  return nestedDependencies;
};
function AllDependenciesList({
  allDependencies,
  handleAddToTrackedDependencies,
}: AllDependenciesListProps) {
  const [open, setOpen] = useState(-1);
  const handleExpandRow = (index: number) => {
    setOpen(open === index ? -1 : index);
  };
  const handleCheckbox = (
    index: number,
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
        (a: string, b: string) => parseInt(b, 10) - parseInt(a, 10)
      );
      [dependencyVersion] = sortedVersionList;
    }
    handleAddToTrackedDependencies({
      name: dependencyName,
      version: dependencyVersion,
    });
  };

  // TODO refactor TS and rest of page
  let parsedDependencies: (Dependencies[] | undefined)[] | null = null;
  let nestedDependencies: null | NestedDependenciesResult = null;
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
      nestedDependencies = nestDependencies(flatDependencies);
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
                            handleCheckbox(
                              index,
                              depRow,
                              //  TODO need to refactor TS
                              nestedDependencies[depRow]
                            )
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
                    nestedDependencies[depRow].map((repo, i) => (
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
        {/* </Table> */}
      </TableContainer>
    </div>
  );
}
export default AllDependenciesList;
