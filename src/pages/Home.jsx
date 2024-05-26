import { Button } from "@mui/material";
import React from "react";
import { handleLogOut } from "../helper";

const Home = () => {
  return (
    <>
      Home
      <Button variant="contained" onClick={handleLogOut}>
        logout
      </Button>
    </>
  );
};

export default Home;
