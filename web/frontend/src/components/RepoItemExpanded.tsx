import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface RepoItemExpandedProps {
  open: boolean;
  handleClose: () => void;
}
function RepoItemExpanded({
  open,
  handleClose,
}: RepoItemExpandedProps): JSX.Element {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Insert Name of Repo</DialogTitle>
        <DialogContent>Repo Information Here</DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RepoItemExpanded;
