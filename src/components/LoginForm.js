import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../auth/AuthContext";
import FTextField from "./form/FTextField";

const style = {
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  border: "1px solid",
  padding: "10px",
  borderRadius: "5px",
};
function LoginForm({ callback }) {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup
    .object({
      username: yup.string().required("Username is required"),
      password: yup.string().required(),
    })
    .required();

  const defaultValues = {
    username: "User",
    password: "123456",
  };
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
  // const handleLogin = (data) => {
  //   auth.singin(data.username, callback);
  // };

  const onSubmit = (data) => {
    // handleLogin(data);
    console.log(data);
  };

  return (
    <Box sx={style} component="form" gap={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="div">
          Login
        </Typography>
        <Stack gap={5}>
          {!!errors?.message && (
            <Alert severity="error">{errors.message}</Alert>
          )}
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
              // {errors.username && <span>This field is required</span>}
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...field}
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
            )}
          />
        </Stack>
        <Button type="submit" sx={{ m: 1, width: "10ch" }} variant="contained">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
