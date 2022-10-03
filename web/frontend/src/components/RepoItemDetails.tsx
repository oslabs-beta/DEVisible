import React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RepoDialog = styled(Dialog)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // margin: "50px",
  // height: "250px",
  // width: "250px",
  // color: theme.palette.primary.contrastText,
}));

interface RepoItemDetailsProps {
  open: boolean;
  handleClose: () => void;
}
const RepoItemDetails = ({ open, handleClose }: RepoItemDetailsProps) => {
  return (
    <>
      <RepoDialog
        open={open}
        // className="repo-details"
        // TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Insert Name of Repo"}</DialogTitle>
        <DialogContent>Repo Information Here</DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Close</Button>
        </DialogActions>
      </RepoDialog>
    </>
  );
};

export default RepoItemDetails;
