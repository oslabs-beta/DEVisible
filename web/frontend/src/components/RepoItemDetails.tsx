import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import LineChart from './charts/LineChart';

interface RepoItemDetailsProps {
  open: boolean;
  handleClose: () => void;
}
const RepoItemDetails = ({ open, handleClose }: RepoItemDetailsProps) => {
  const [dependencyView, setDependencyView] = useState(false);
  const handleSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDependencyView(event.target.checked);
  };
  return (
    <>
      <Dialog
        open={open}
        // className="repo-details"
        // TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{'Insert Name of Repo'}</DialogTitle>
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
          {!dependencyView ?
          <LineChart /> :
          <div>
            hey
          </div>
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RepoItemDetails;
