/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
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
}
function MasterDependencies({
  dependencyPrefs,
  handleDeleteTrackedDependency,
}: MasterDependenciesListProps) {
  const [alteredVersion, setAlteredVersion] = useState(dependencyPrefs);
  const handleChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const alteredVersionCopy = [...alteredVersion];
    alteredVersionCopy[parseInt(e.target.id, 10)].version = e.target.value;
    setAlteredVersion(alteredVersionCopy);
  };
  console.log('alt', alteredVersion);
  console.log('deps', dependencyPrefs);
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {dependencyPrefs && alteredVersion ? (
              dependencyPrefs.map((depRow, index) => (
                <TableRow key={index}>
                  <TableCell key={index} width="35%">
                    {depRow.name}
                  </TableCell>
                  <TableCell key={(index + 1) * -1} align="left" width="60%">
                    <TextField
                      size="small"
                      label="Version"
                      id={index.toString()}
                      defaultValue={depRow.version}
                      sx={{ width: '50%' }}
                      onChange={handleChangeVersion}
                    />
                    {console.log(
                      'depI',
                      dependencyPrefs[index].version,
                      'altI',
                      alteredVersion[index].version
                    )}
                    {dependencyPrefs[index].version !==
                    alteredVersion[index].version ? (
                      <IconButton>
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
