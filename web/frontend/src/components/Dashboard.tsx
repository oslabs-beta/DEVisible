import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import '../stylesheets/dashboard.css'
import { Grid, Paper } from "@mui/material";
import RepoItem from "./RepoItem";
import Loader from "./Loader";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.primary.contrastText,
// }));
const Dashboard = () => {
  const [mockLoading, setMockLoading] = useState(true); //used for loader testing
  const numCards = 8;
  const cards = [];
  for (let i = 0; i < numCards; i++) {
    cards.push(<RepoItem key={i}/>);
  }
  const handleStopMockLoading = () => {
    setMockLoading(false);
  }
  //used for loader testing
  useEffect(() => {
    setTimeout(handleStopMockLoading, 2000);
  }, [])
  return (
    <div className="dashboard-container">
      {mockLoading ? <Loader color={'orange'}/> : (
      <Grid display="flex" justifyContent="center" container spacing={2}>
        {cards}
      </Grid>

      )}
    </div>
  );
};

export default Dashboard;
