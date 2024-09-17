import React from 'react'
import { Box, Grid, IconButton, Tooltip } from "@mui/material"
import { matBlack, orange } from '../constants/color';
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon

} from "@mui/icons-material"
const Groups = () => {

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton >
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          // onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )


  return (
    <Grid container
      height={"100vh"}>
      <Grid
        item
        //  xs={12}
        sm={4}
        sx={{
          xs: "none", sm: "block",
          bgcolor: "turquoise"
        }}
      >
        Groups list
      </Grid>
      <Grid
        item
        xs={12} sm={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexDirection: "column",
          padding: "1rem 3rem"
        }}
      >
        {IconBtns}

      </Grid>
    </Grid>
  )
}

// export default AppLayout()(Groups);

export default Groups;

