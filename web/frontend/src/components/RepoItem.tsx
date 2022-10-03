import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import RepoItemDetails from "./RepoItemDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: "50px",
  height: "250px",
  width: "250px",
  color: theme.palette.primary.contrastText,
}));
const RepoItem = () => {
  const [openRepoModal, setOpenRepoModal] = useState(false);
  const handleOpenRepoModal = () => {
    console.log('click', openRepoModal)
    setOpenRepoModal(true);
  }
  const handleCloseRepoModal = () => {
    console.log('click', openRepoModal)
    setOpenRepoModal(false);
  }
  return (
    <>
      <Grid>
        <Item className="repo-item" onClick={handleOpenRepoModal}>
          Repo
        </Item>
      <RepoItemDetails open={openRepoModal} handleClose={handleCloseRepoModal}/>
      </Grid>
    </>
  );
};

export default RepoItem;
