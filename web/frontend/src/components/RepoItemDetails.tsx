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

/**
 * @typeParam outOfSpecDeps - array of strings that indicates dependencies out of spec
 * @typeParam repoName - string that indicates the name of the repository
 * @typeParam open - boolean that indicates whether expanded box is open or not
 * @typeParam handleClose - method to close expanded box
 * @typeParam buildsInfo - object that follows {@link BuildInfo}
 * @typeParam deleteRepo - method to delete repository from monitoring
 */
interface RepoItemDetailsProps {
  outOfSpecDeps: string[];
  repoName: string;
  open: boolean;
  handleClose: () => void;
  buildsInfo: BuildInfo[];
  deleteRepo: (repoId: number) => void;
}

/**
 * function that renders the chart details of selected repo
 * @param props - takes in {@link RepoItemDetailsProps}
 * @returns JSX.Element
 */
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  /**
   * helper function that is invoked by confirmation of delete repo alert dialog
   * @returns void
   */
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
          <Typography sx={{ color: 'black' }}>
            {!dependencyView ? <strong>Charts</strong> : 'Charts'}
          </Typography>

          <Switch onChange={handleSlider} />
          <Typography sx={{ color: 'black' }}>
            {dependencyView ? <strong>Dependencies</strong> : 'Dependencies'}
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
