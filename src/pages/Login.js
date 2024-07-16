import { Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../components/LoginModal";

function Login() {
  let navigate = useNavigate();

  return (
    <Stack sx={{ p: 4, alignItems: "center" }}>
      <LoginModal />
    </Stack>
  );
}

export default Login;
