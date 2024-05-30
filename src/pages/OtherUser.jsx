import React from "react";
import { useParams } from "react-router-dom";

const OtherUser = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};

export default OtherUser;
