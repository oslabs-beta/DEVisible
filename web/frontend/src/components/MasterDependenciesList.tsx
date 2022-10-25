/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TextField,
} from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import { AddedTrackedDependency } from '../types';

/**
 * @typeParam dependencyPrefs - list of dependencies tracked {@link AddedTrackedDependency}
 * @typeParam handleDeleteTrackedDependency - method to delete dependency from list to track
 * @typeParam handleUpdateVersion - method to update the version to track of the dependency
 */
interface MasterDependenciesListProps {
  dependencyPrefs: AddedTrackedDependency[] | null;
  handleDeleteTrackedDependency: (depName: string) => void;
  handleUpdateVersion: (depName: string, newVersion: string) => void;
}

/**
 * function that renders the dependency list table
 * @param props - takes in {@link MasterDependenciesListProps}
 * @returns JSX.Element
 */
function MasterDependenciesList({
  dependencyPrefs,
  handleDeleteTrackedDependency,
  handleUpdateVersion,
}: MasterDependenciesListProps) {
  const [versionChanged, setVersionChanged] = useState<boolean[]>([]);
  const [newVersion, setNewVersion] = useState<string[]>([]);

  // update displayed version
  useEffect(() => {
    if (Array.isArray(dependencyPrefs)) {
      setVersionChanged(Array(dependencyPrefs.length).fill(false));
      setNewVersion(Array(dependencyPrefs.length).fill(''));
    }
  }, [dependencyPrefs]);

  /**
   * function to change version of dependency to track
   * @param event - {@link https://developer.mozilla.org/en-US/docs/Web/Events | event type}
   * @param index - number that indicates the index of the dependency to be updated
   */
  const handleChangeVersion = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const copyArr = [...versionChanged];
    copyArr[index] = true;
    const copyVersionList = [...newVersion];
    copyVersionList[index] = event.target.value;
    setVersionChanged(copyArr);
    setNewVersion(copyVersionList);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencyPrefs && newVersion ? (
              dependencyPrefs.map((depRow, index) => (
                <TableRow key={depRow.name}>
                  <TableCell key={depRow.version} width="35%">
                    {depRow.name}
                  </TableCell>
                  <TableCell key={(index + 1) * -1} align="left" width="60%">
                    <TextField
                      size="small"
                      label="Version"
                      id={depRow.name}
                      defaultValue={depRow.version}
                      sx={{ width: '50%' }}
                      onChange={(event) => handleChangeVersion(event, index)}
                    />
                    {versionChanged[index] ? (
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          handleUpdateVersion(depRow.name, newVersion[index])
                        }
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      ''
                    )}
                  </TableCell>

                  <TableCell key={`-${index.toString()}`} align="center">
                    <IconButton
                      key={index}
                      color="primary"
                      onClick={() => handleDeleteTrackedDependency(depRow.name)}
                    >
                      <DeleteIcon key={index} />
                    </IconButton>
                  </TableCell>
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
export default MasterDependenciesList;
