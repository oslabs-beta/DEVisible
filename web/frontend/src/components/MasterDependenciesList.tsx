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

interface MasterDependenciesListProps {
  dependencyPrefs: AddedTrackedDependency[] | null;
  handleDeleteTrackedDependency: (depName: string) => void;
  handleUpdateVersion: (depName: string, newVersion: string) => void;
}
function MasterDependencies({
  dependencyPrefs,
  handleDeleteTrackedDependency,
  handleUpdateVersion,
}: MasterDependenciesListProps) {
  const [versionChanged, setVersionChanged] = useState<object[]>();
  const [newVersion, setNewVersion] = useState<string[]>();
  // Array.isArray(dependencyPrefs)
  //   ? Array(dependencyPrefs.length).fill(false)
  //   : false
  useEffect(() => {
    if (Array.isArray(dependencyPrefs)) {
      setVersionChanged(Array(dependencyPrefs.length).fill(false));
      setNewVersion(Array(dependencyPrefs.length).fill(''));
    }
  }, [dependencyPrefs]);
  const handleChangeVersion = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copyArr = { ...versionChanged };
    copyArr[index] = true;
    const copyVersionList = { ...newVersion };
    copyVersionList[index] = event.target.value;
    setVersionChanged(copyArr);
    setNewVersion(copyVersionList);
  };
  // const alteredVersionCopy = [...alteredVersion];
  // alteredVersionCopy[parseInt(e.target.id, 10)].version = e.target.value;
  // setAlteredVersion(alteredVersionCopy);
  // console.log('alt', alteredVersion);
  console.log('versionChanged', versionChanged);
  console.log('newVersion', newVersion);
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencyPrefs && newVersion ? (
              dependencyPrefs.map((depRow, index) => (
                <TableRow key={index}>
                  <TableCell key={index} width="35%">
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
export default MasterDependencies;
