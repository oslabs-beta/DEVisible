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
  Checkbox,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import theme from '../theme';
import jsonVerify from './utils/jsonVerify';
import { AllDependenciesBuilds } from '../types';

interface AllDependenciesListProps {
  allDependencies: AllDependenciesBuilds[] | null;
}
interface Dependencies {
  name: string;
  version: string;
  repoName: string;
  isDevDependency?: boolean;
}
type NestedDepencies = {
  [key: string]: string;
};
interface NestedDependenciesResult {
  [key: string]: NestedDepencies[];
}
const nestDependencies = (dependencies: Dependencies[]) => {
  const nestedDependencies: NestedDependenciesResult = {};
  dependencies.forEach((dependency: Dependencies) => {
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

  return nestedDependencies;
};
function AllDependenciesList({ allDependencies }: AllDependenciesListProps) {
  const [open, setOpen] = useState(-1);
  const handleExpandRow = (index: number) => {
    setOpen(open === index ? -1 : index);
  };
  // const handleCheckbox = (index, dependencyName, dependencyVersionsList) => {
  //   const resultList = [];
  //   Object.values(dependencyVersionsList).map((repo) => {
  //     console.log('val', Object.values(repo));
  //   });
  //   dependencyVersionsList = [
  //     { test1: '16.3.2' },
  //     { test2: '18.4' },
  //     { test: '12.3' },
  //   ];
  //   let dependencyVersion = Object.values(dependencyVersionsList)[0];
  //   if (dependencyVersionsList.length > 1) {
  //     dependencyVersion = Object.values(dependencyVersionsList).sort(
  //       (a: string, b: string) => {
  //         console.log('yo', a, parseInt(a, 10), typeof parseInt(a, 10));
  //         return parseInt(a, 10) - parseInt(b, 10);
  //       }
  //     );
  //     console.log('here', dependencyVersion);
  //   }
  //   console.log(
  //     'index',
  //     index,
  //     'depName',
  //     dependencyName,
  //     'depVersion',
  //     dependencyVersion
  //   );
  // };
  let parsedDependencies: null | Dependencies[] = null;
  let nestedDependencies: null | NestedDependenciesResult = null;
  if (allDependencies) {
    parsedDependencies = allDependencies?.map((repo: AllDependenciesBuilds) => {
      const result = jsonVerify(repo.builds[repo.builds.length - 1].deps);
      if (!result || !Array.isArray(result)) return null;
      return result.map((dep: Omit<Dependencies, 'repoName'>) => ({
        ...dep,
        repoName: repo.name,
      })); // append repo name to each object of array
    });
    parsedDependencies = parsedDependencies.flat(); //  combine list of all deps to single list
    nestedDependencies = nestDependencies(parsedDependencies);
    // nestedDependencies = false;
  }
  return (
    <div>
      <TableContainer>
        {nestedDependencies ? (
          Object.keys(nestedDependencies)?.map((depRow, index) => {
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
                        <Checkbox
                          key={index}
                          // onChange={() =>
                          //   handleCheckbox(
                          //     index,
                          //     depRow,
                          //     nestedDependencies[depRow]
                          //   )
                          // }
                        />
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
