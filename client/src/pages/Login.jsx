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
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';

import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { usernamevalidator, } from '../utils/validators';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const username = useInputValidation("", usernamevalidator);
  const bio = useInputValidation("");
  // const password = useStrongPassword();
  const password = useInputValidation("");
  const avatar = useFileHandler("single")

  const handdleLogin = (e) => {
    e.preventDefault();
  }
  const handdleSignup = (e) => {
    e.preventDefault();
  }

  console.log(name.value, bio.value, password.value);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(9 51 215), #e508c89c)"
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          
          height: "110vh",
          display: "flex",
          justifyContent: "center",
          allignItems: "center",
        }}
      >
        <Paper
          elevation={15}
          fullWidth
          sx={{
            // bgcolor:"", 
            padding: "4",
            display: "flex",
            flexDirection: "column",
            allignItems: "center",
          }}
        >

          {isLogin ? (
            <>
              {/*  login form*/}
              <Typography variant="h5"
                textAlign={"center"}
                m={"1rem"}
              >
                Login
              </Typography>
              {/* login form */}

              <form
                style={{
                  width: "100%",
                  marginTop: "1rem"
                }}
                onSubmit={handdleLogin}
              >
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  margin='normal'
                  label="username"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  margin='normal'
                  label="password"
                  type='password'
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  sx={{ marginTop: "1rem" }}
                >login
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1rem"}
                  marginTop={"1rem"}
                >OR
                </Typography>

                <Button
                  variant='text'
                  color='primary'
                  fullWidth
                  type='submit'
                  sx={{ marginTop: "1rem" }}
                  onClick={toggleLogin}
                >
                  signup instead
                </Button>
              </form>

            </>

          ) : (



            <>
              <Typography variant="h5"
                textAlign={"center"}
                m={"1rem"}
              > signup </Typography>

              {/* registration form */}
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem"
                }}
                onSubmit={handdleSignup}
              >
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
                  {
                    avatar.error && (
                      <Typography
                        m={"2rem"}
                        width={"fit-content"}
                        display={"block"}
                        color={"error"}
                        variant='caption'>
                        {avatar.error}
                      </Typography>
                    )
                  }

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
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                    </>
                  </IconButton>
                </Stack>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  margin='normal'
                  label="name"
                  value={name.value}
                  onChange={name.changeHandler}

                />

                <TextField
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  label="bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  margin='normal'
                  label="username"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {
                  username.error && (
                    <Typography color={"error"}
                      variant='caption'>
                      {username.error}
                    </Typography>
                  )
                }


                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  margin='normal'
                  label="password"
                  type='password'
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {
                  password.error && (
                    <Typography color={"error"}
                      variant='caption'>
                      {password.error}
                    </Typography>
                  )
                }

                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  sx={{ marginTop: "1rem" }}
                >signup
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1rem"}
                  marginTop={"1rem"}
                >OR
                </Typography>

                <Button
                  variant='text'
                  color='primary'
                  fullWidth
                  type='submit'
                  sx={{ marginTop: "1rem" }}
                  onClick={toggleLogin}
                >
                  login instead
                </Button>
              </form>
            </>

          )}
        </Paper>
      </Container>
    </div>

  )
}

export default Login




























