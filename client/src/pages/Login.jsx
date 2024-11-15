import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Paper,
  Button,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material'
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { useFileHandler, useInputValidation } from '6pp';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { usernamevalidator } from '../utils/validators';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const username = useInputValidation("", usernamevalidator);
  const bio = useInputValidation("");
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      console.log("Logging in with", username.value, password.value);
    } else {
      // Handle signup logic here
      console.log("Signing up with", name.value, username.value, password.value);
    }
  }

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgba(9 51 215), #e508c89c)"
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "110vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={15}
          sx={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" textAlign={"center"} mb={"1rem"}>
            {isLogin ? "Login" : "Sign Up"}
          </Typography>

          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <>
                <Stack
                  position={"relative"}
                  width={"10rem"}
                  margin={"auto"}
                >
                  <Avatar
                    sx={{
                      height: "10rem", width: "10rem",
                      objectFit: "contain"
                    }}
                    src={avatar.preview}
                  />
                  {avatar.error && (
                    <Typography
                      m={"2rem"}
                      width={"fit-content"}
                      display={"block"}
                      color={"error"}
                      variant="caption"
                    >
                      {avatar.error}
                    </Typography>
                  )}

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      ":hover": { bgcolor: "rgba(0,0,0, 0.7)" }
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </IconButton>
                </Stack>
              </>
            )}

            <TextField
              variant="outlined"
              required
              fullWidth
              margin="normal"
              label="Username"
              value={username.value}
              onChange={username.changeHandler}
            />

            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  label="Name"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  label="Bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
              </>
            )}

            <TextField
              variant="outlined"
              required
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password.value}
              onChange={password.changeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography
              textAlign={"center"}
              m={"1rem"}
              mt={"1rem"}
            >
              OR
            </Typography>

            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={toggleLogin}
              sx={{ marginTop: "1rem" }}
            >
              {isLogin ? "Sign up instead" : "Login instead"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Login;
