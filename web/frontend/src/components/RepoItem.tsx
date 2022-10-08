import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import RepoItemDetails from './RepoItemDetails';
import { BuildInfo, GetUserInfo } from '../types';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  margin: '50px',
  height: '250px',
  width: '250px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 15px 0 rgba(0,0,0.19)',
  color: theme.palette.primary.contrastText,
}));

interface RepoItemProps {
  repoName: string;
  builds: BuildInfo[];
  data: GetUserInfo[];
  setData: React.Dispatch<React.SetStateAction<GetUserInfo[] | undefined>>;
}
const percentChange = (current: number, previous: number) => {
  return `${((100 * (current - previous)) / Math.abs(previous)).toFixed(2)} %`;
};

function RepoItem({
  repoName,
  builds,
  data,
  setData,
}: RepoItemProps): JSX.Element {
  const [openRepoModal, setOpenRepoModal] = useState(false);
  const mostRecentBuildSize = builds[builds.length - 1].buildSize;
  const buildPercentChange = builds[builds.length - 2]
    ? percentChange(
        builds[builds.length - 1].buildSize,
        builds[builds.length - 2].buildSize
      )
    : 'N/A';
  const handleOpenRepoModal = () => {
    setOpenRepoModal(true);
  };
  const handleCloseRepoModal = () => {
    setOpenRepoModal(false);
  };
  return (
    <div>
      <Grid>
        <Item className="repo-item-container" onClick={handleOpenRepoModal}>
          <Typography
            sx={{ mt: '5px', mb: '5px' }}
            variant="h5"
            color="white"
            align="center"
          >
            {repoName}
          </Typography>
          <Divider sx={{ bgcolor: 'secondary.light' }} />
          <div className="repo-item-condensed">
            <Typography sx={{ mt: '30px' }}>Build Size:</Typography>
            <Typography
              sx={{ mb: '10px' }}
              variant="h6"
              color="white"
            >{`${mostRecentBuildSize} kB`}</Typography>

            <Typography>Percent Change:</Typography>
            <Typography variant="h6" color="white">
              {buildPercentChange}
            </Typography>
          </div>
        </Item>
        <RepoItemDetails
          key={repoName + Math.random().toString()}
          repoName={repoName}
          open={openRepoModal}
          handleClose={handleCloseRepoModal}
          buildsInfo={builds}
          data={data}
          setData={setData}
        />
      </Grid>
    </div>
  );
}

export default RepoItem;
