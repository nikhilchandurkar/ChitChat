import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { orange } from '../../constants/color'
import React, { Suspense, lazy, useState } from 'react'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"
import { useNavigate, } from 'react-router-dom'
const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationsDialog = lazy(() => import("../specific/Notifications"))
const NewGroupsDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  // functions
  const navigate = useNavigate("/group");

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearch = () => {
    setIsSearch((prev) => !prev);

  };

  const addNewGroup = () => {
    console.log("add new group")
    setIsNewGroup((prev) => !prev)
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev)
  };

  const logoutHandler = () => {
    console.log("logout");

  };

  const navigateToGroup = () => navigate("/groups");


  return (

    <>
      <Box
        sx={{ flexGrow: 1 }}
        height={"4rem"}
      >
        <AppBar
          position='static'
        sx={{
          // backgroundColor:""
        }}
        >

          <Toolbar >
            <Typography variant="h6"
              sx={{
                display: {
                  xs: "none", sm: "block"
                },
              }}
            >
              Chat App
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block", sm: "none"
                },
              }}
            >

              <IconButton color='inherit'
                onClick={handleMobile}
              >
                <MenuIcon />
              </IconButton>
            </Box>


            <Box sx={{ flexGrow: 1, }} />

            <Box >

              <IconBtn
                title={"search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title="new group"
                icon={<AddIcon />}
                onClick={addNewGroup}
              />

              <IconBtn
                title={"manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"notifications "}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />


              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />

            </Box>


          </Toolbar>
        </AppBar>
      </Box>
      {
        isSearch && (
          <Suspense fallback={<Backdrop open/>}>
            <SearchDialog />
          </Suspense>
        )}

      {
        isNotification && (
          <Suspense fallback={<Backdrop open/>}>
            <NotificationsDialog />
          </Suspense>
        )}


      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open/>}>
            <NewGroupsDialog />
          </Suspense>
        )}

    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header
