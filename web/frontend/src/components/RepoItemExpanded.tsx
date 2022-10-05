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
const RepoItemExpanded = ({ open, handleClose }: RepoItemExpandedProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Insert Name of Repo'}</DialogTitle>
        <DialogContent>Repo Information Here</DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RepoItemExpanded;
