import React from "react";
import Header from "../../components/Header";
import Row1 from "./Row1";


const Dashboard = () => {
  return (
    <div>
      <Header title={"DASHBORAD"} subTitle={"Welcome To Dashboard"} />
      <Row1/>
      
    </div>
  );
};

export default Dashboard;
