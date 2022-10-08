import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Box,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import LineChart from './charts/LineChart';
import { BuildInfo, GetUserInfo } from '../types';
import RepoItemDependencies from './RepoItemDependencies';

interface RepoItemDetailsProps {
  repoName: string;
  open: boolean;
  handleClose: () => void;
  buildsInfo: BuildInfo[];
  data: GetUserInfo[];
  setData: React.Dispatch<React.SetStateAction<GetUserInfo[] | undefined>>;
}

function RepoItemDetails({
  repoName,
  open,
  handleClose,
  buildsInfo,
  data,
  setData,
}: RepoItemDetailsProps): JSX.Element {
  const [dependencyView, setDependencyView] = useState(false);
  const handleSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDependencyView(event.target.checked);
  };
  const dependencies = buildsInfo[buildsInfo.length - 1].deps; // list of dependencies from most recent build

  const deleteRepo = async (): Promise<void> => {
    // find the current repo by name in the data prop drilled down from the dashboard component
    // eslint-disable-next-line no-restricted-syntax
    let repoId = Infinity;
    // eslint-disable-next-line no-restricted-syntax
    for (const repo of data) {
      // each repo is an object in the data array
      if (repo.name === repoName) {
        // this is the repo we want to delete from the database
        // access id property from this repo and send it as a param on delete request to server
        repoId = repo.id;
        break;
      }
    }
    // make axios delete request to server
    const deleteResponse = await axios.delete(`/webAPI/repo/${repoId}`);
    console.log(deleteResponse);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: '5px', width: '50%', height: '70vh' },
        }}
      >
        <DialogTitle>{repoName}</DialogTitle>
        <Divider />
        <Box className="chart-title">
          <Typography>
            {!dependencyView ? <strong>Charts</strong> : 'Charts'}{' '}
          </Typography>

          <Switch onChange={handleSlider} />
          <Typography>
            {dependencyView ? <strong>Dependencies</strong> : 'Dependencies'}{' '}
          </Typography>
        </Box>
        <DialogContent>
          {!dependencyView ? (
            <LineChart buildsInfo={buildsInfo} />
          ) : (
            <RepoItemDependencies
              key={buildsInfo[0].id}
              dependencies={dependencies}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          {/* TODO implement delete repo functionality */}
          <IconButton
            onClick={deleteRepo}
            sx={{ ml: '3px', mb: '0px' }}
            color="primary"
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
          <Button
            sx={{ mr: '3px', mb: '0px', color: 'white' }}
            variant="contained"
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RepoItemDetails;
