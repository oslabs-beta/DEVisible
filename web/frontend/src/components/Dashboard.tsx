import React, { useState, useEffect } from "react";
import '../stylesheets/dashboard.css'
import { Grid, Paper } from "@mui/material";
import RepoItem from "./RepoItem";
import Loader from "./Loader";
import mockData from "./mocks/mocks";

const Dashboard = () => {
  const [mockLoading, setMockLoading] = useState(true); //used for loader testing
  console.log('mock', mockData)
  const numOfRepoCards = mockData.repos.length ;
  const repoCards = [];
  for (let i = 0; i < numOfRepoCards; i++) {
    repoCards.push(<RepoItem repoName={mockData.repos[i].name} builds={mockData.repos[i].builds} key={i}/>);
  }
  const handleStopMockLoading = () => {
    setMockLoading(false);
  }
  //used for loader testing
  // useEffect(() => {
    setTimeout(handleStopMockLoading, 2000);
  // }, [])
  return (
    <div className="dashboard-container">
      {mockLoading ? <Loader color={'orange'}/> : (
      <Grid display="flex" justifyContent="center" container spacing={2}>
        {repoCards}
      </Grid>

      )}
    </div>
  );
};

export default Dashboard;
