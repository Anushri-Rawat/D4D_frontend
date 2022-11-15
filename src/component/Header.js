import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { AccountCircle, Logout } from "@mui/icons-material";
import logo from "../images/logo1.png";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { profileInfo } = useSelector((state) => state.userDetails);
  return (
    <AppBar position="static" sx={{ background: "white" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "5px 0",
          justifyContent: "space-between",
        }}
      >
        {/* <Typography
          variant="h5"
          onClick={() => navigate("/")}
          sx={{
            flexGrow: 1,
            color: "black",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          D4D
        </Typography> */}
        <img
          src={logo}
          alt="D4D"
          style={{ height: "60px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Box>
          {userInfo ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    src={profileInfo?.profile_image}
                    alt="profile photo"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem sx={{ display: "flex", gap: "0.5rem" }}>
                  <Avatar
                    src={profileInfo?.profile_image}
                    alt="profile photo"
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {userInfo.first_name + " " + userInfo.last_name}
                    </Typography>
                    <Typography variant="p" sx={{ color: "#777" }}>
                      @{profileInfo?.username}
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("profile");
                  }}
                >
                  <AccountCircle />
                  <Typography textAlign="center" sx={{ marginLeft: "5px" }}>
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    dispatch(logout());
                  }}
                >
                  <Logout />
                  <Typography textAlign="center" sx={{ marginLeft: "3px" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <RouterLink to="/signup" style={{ textDecoration: "none" }}>
              <Button variant="contained">Signin</Button>
            </RouterLink>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
