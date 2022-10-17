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
import LineChart from './charts/LineChart';
import { BuildInfo } from '../types';
import RepoItemDependencies from './RepoItemDependencies';

interface RepoItemDetailsProps {
  outOfSpecDeps: string[];
  repoName: string;
  open: boolean;
  handleClose: () => void;
  buildsInfo: BuildInfo[];
  deleteRepo: (repoId: number) => void;
}

function RepoItemDetails({
  outOfSpecDeps,
  repoName,
  open,
  handleClose,
  buildsInfo,
  deleteRepo,
}: RepoItemDetailsProps): JSX.Element {
  const [dependencyView, setDependencyView] = useState(false);
  const handleSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDependencyView(event.target.checked);
  };
  const dependencies = buildsInfo[buildsInfo.length - 1].deps; // list of dependencies from most recent build
  // find the current repo's ID by accessing the first build in the builds array (every repo will by definition have at least one build)
  const { repoId } = buildsInfo[0];
  // tracks the state of whether the delete repo confirmation dialog is open
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    // swap diaglog open status to the opposite of whatever it currently is -> toggles back and forth between open and closed
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // helper function that is invoked by confirmation of delete repo alert dialog
  // closes the dialog and invokes the deleteRepo function, passing in the current Repo ID
  const closeAndDeleteRepo = () => {
    handleDialogClose();
    handleClose();
    deleteRepo(repoId);
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
              outOfSpecDeps={outOfSpecDeps}
              key={buildsInfo[0].id}
              dependencies={dependencies}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          {/* TODO implement delete repo functionality */}
          <IconButton
            onClick={handleDialogOpen}
            sx={{ ml: '3px', mb: '0px' }}
            color="primary"
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="Delete alert"
            aria-describedby="Prompt users to confirm whether they would like to delete repo"
          >
            <DialogTitle id="Delete Repo Alert">
              Are you sure you would like to delete this repo?
            </DialogTitle>
            <DialogActions>
              <Button onClick={closeAndDeleteRepo} autoFocus>
                Yes
              </Button>
              <Button onClick={handleDialogClose}>No</Button>
            </DialogActions>
          </Dialog>
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
