import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography } from "@mui/material";
import RepoItemDetails from "./RepoItemDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: "50px",
  height: "250px",
  width: "250px",
  borderRadius: "20px",
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 15px 0 rgba(0,0,0.19)',
  color: theme.palette.primary.contrastText,
}));
const RepoItem = () => {
  const [openRepoModal, setOpenRepoModal] = useState(false);
  // const handleClickRepo = () => {
  //   setOpenRepoModal(!open);
  // }
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
        {/* <Item className={openRepoModal ? "repo-item-expanded" : "repo-item-condensed"} onClick={handleClickRepo}> */}
        <Item className="repo-item-condensed" onClick={handleOpenRepoModal}>
          <Typography>Build Size: 30 Mb</Typography>
          <div className='circle-percent'></div>
          <Typography>Percent Change: 10 %</Typography>
        </Item>
      <RepoItemDetails open={openRepoModal} handleClose={handleCloseRepoModal}/>
      </Grid>
    </>
  );
};

export default RepoItem;
