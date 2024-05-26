import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export const UserPanel = () => {
  return (
    <Box className="bg-pink-400">
      <Outlet />
    </Box>
  );
};
