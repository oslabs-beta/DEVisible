import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import RepoItemDetails from './RepoItemDetails';
import { BuildInfo, OutOfSpecDeps } from '../types';
import formatBytes from './utils/formatBytes';
import theme from '../theme';

const Item = styled(Paper)(() => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  margin: '50px',
  height: '250px',
  width: '250px',
  borderRadius: '20px',
  color: theme.palette.primary.contrastText,
}));

/**
 * @typeParam repoOutOfSpecInfo - object according to {@link OutOfSpecDeps}
 * @typeParam repoName - string that indicates the repostiory's name
 * @typeParam builds - object according to {@link BuildInfo}
 * @typeParam deleteRepo - method to delete repostiory to monitor
 */
interface RepoItemProps {
  repoOutOfSpecInfo: OutOfSpecDeps;
  repoName: string;
  builds: BuildInfo[];
  deleteRepo: (repoId: number) => void;
}
const percentChange = (current: number, previous: number) => {
  return `${((100 * (current - previous)) / Math.abs(previous)).toFixed(2)} %`;
};

/**
 * function to render the container of the individual repository information
 * @param props - takes in {@link RepoItemProps}
 * @returns JSX.Element
 */
function RepoItem({
  repoOutOfSpecInfo,
  repoName,
  builds,
  deleteRepo,
}: RepoItemProps): JSX.Element {
  const [openRepoModal, setOpenRepoModal] = useState(false);
  const mostRecentBuildSize = formatBytes(builds[builds.length - 1].buildSize);
  const buildPercentChange = builds[builds.length - 2]
    ? percentChange(
        builds[builds.length - 1].buildSize,
        builds[builds.length - 2].buildSize
      )
    : 'N/A';
  // opens box that displays more info about repo
  const handleOpenRepoModal = () => {
    setOpenRepoModal(true);
  };
  // closes box that displays more info about repo
  const handleCloseRepoModal = () => {
    setOpenRepoModal(false);
  };
  return (
    <div>
      <Grid>
        <Item
          className="repo-item-container"
          onClick={handleOpenRepoModal}
          sx={{
            boxShadow: repoOutOfSpecInfo.status
              ? `0 6px 20px 0 ${theme.palette.error.main}, 0 3px 15px 0 rgba(0,0,0.19)`
              : '0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 15px 0 rgba(0,0,0.19)',
          }}
        >
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
            <Typography sx={{ mb: '10px' }} variant="h6" color="white">
              {mostRecentBuildSize}
            </Typography>

            <Typography>Percent Change:</Typography>
            <Typography variant="h6" color="white">
              {buildPercentChange}
            </Typography>
          </div>
        </Item>
        <RepoItemDetails
          key={repoName}
          outOfSpecDeps={repoOutOfSpecInfo.depsOutOfSpec}
          repoName={repoName}
          open={openRepoModal}
          handleClose={handleCloseRepoModal}
          buildsInfo={builds}
          deleteRepo={deleteRepo}
        />
      </Grid>
    </div>
  );
}

export default RepoItem;
