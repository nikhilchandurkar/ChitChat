import React from 'react'
import { Grid, Skeleton, Stack } from '@mui/material'

export const LayoutLoader = () => {
  return (
    <>
      <Grid container height={"calc(100vh - 4rem)"}
        spacing={"1rem"}
      >
        <Grid item height={"100%"}
          sm={4}
          md={3}
          lg={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >

          <Skeleton animation="wave"
            variant='reactangular'
            height={"100vh"} />
        </Grid>

        <Grid item
          xs={12}
          sm={8}
          md={5}
          lg={6}
          height={"100%"}
        >
          <Stack spacing={"1rem"}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
               key={index}
               animation="wave"
               variant='rounded'
                height={"5rem"}

                 />
            ))}
          </Stack>


        </Grid>

        <Grid item height={"100%"}
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Skeleton 
          variant='reactangular' 
          animation="pulse"
          height={"100vh"}

           />
        </Grid>

      </Grid>
    </>
  )
}

