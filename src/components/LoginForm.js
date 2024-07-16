import React, { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../auth/AuthContext";
import { Link } from "react-router-dom";
// import FTextField from "./form/FTextField";

const style = {
  // bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  width: "500px",
  border: "1px solid",
  padding: "50px",
  borderRadius: "5px",
  backgroundColor: (theme) => theme.palette.primary.light,
};

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// const defaultValues = {
//   username: "User",
//   password: "123456",
// };

function LoginForm({ callback }) {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = (data) => {
    auth.singin(data.username, callback);
  };

  const onSubmit = (data) => {
    handleLogin(data);
    console.log(data);
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <Box sx={style} component="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} alignItems="center" justifyContent="center">
        <Avatar alt="Login" sx={{ bgcolor: "#df4747" }}>
          <LockOutlinedIcon sx={{ color: "black" }} />
        </Avatar>
        <Typography variant="h4" component="div" sx={{ color: "#fff" }}>
          Login
        </Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{ style: { color: "#bababa" } }}
              />
            );
          }}
        />
        {/* {errors.username && <span>{errors.username.message}</span>} */}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...field}
                InputLabelProps={{ style: { color: "#bababa" } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <Button
          type="submit"
          sx={{ m: 1, width: "100%", bgcolor: "#df4747" }}
          variant="contained"
        >
          Login
        </Button>
        <Box width="100%">
          <Stack direction="row" justifyContent="space-between">
            <Link
              style={{
                color: "#df4747",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Forgot password?
            </Link>
            <Link
              style={{
                color: "#df4747",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
    // </form>
  );
}

export default LoginForm;
