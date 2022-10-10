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
import { BuildInfo, GetUserInfo } from '../types';
import RepoItemDependencies from './RepoItemDependencies';

interface RepoItemDetailsProps {
  repoName: string;
  open: boolean;
  handleClose: () => void;
  buildsInfo: BuildInfo[];
  deleteRepo: (repoId: number) => void;
}

function RepoItemDetails({
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
            onClick={() => deleteRepo(repoId)}
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
