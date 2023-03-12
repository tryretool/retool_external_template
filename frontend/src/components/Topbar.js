import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, darkModeTopbar }) => ({
  boxShadow: "none",
  borderBottom: darkModeTopbar ?  "2px solid #181929" : "2px solid #eeeeee",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  ...(open && {
    marginLeft: 250,
    width: `calc(100% - ${250}px)`,
  }),
}));

export const Topbar = ({
  drawerIsOpen,
  user = {},
  onToggleDrawer,
  age,
  darkMode,
  darkModeTopbar,
  formatting,
  ...props
}) => {
  
  
  return (
    <AppBar position="fixed" open={drawerIsOpen} darkModeTopbar={darkModeTopbar}>
      <Toolbar
        sx={{
          pr: "24px",
          color: formatting.text,
          backgroundColor: formatting.backgroundColor ,
          border: '0px'
        }}
      >
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: "36px",
            color: darkMode ? 'white' : '#080928' , 
            ...(drawerIsOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <div
            style={{
              fontWeight: 900,
              fontSize: 24,
              letterSpacing: ".25px",
              marginLeft: "15px",
              border: '0px'
            }}
          >
            Shopco Merchant
          </div>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <span
          style={{
            marginRight: "20px",
            fontSize: "16px",
            letterSpacing: ".25px",
            fontWeight: 500
          }}
        >
          {user.name}
        </span>
        <UserMenu {...props} formatting={formatting}/>
      </Toolbar>
    </AppBar>
  );
};

const UserMenu = ({
  userProfile = {},
  handleSwitchGroup,
  handleShowBorder,
  formatting
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const group = userProfile?.user?.group

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AccountCircle
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
  
      <Menu
        sx={{ mt: "45px", color: '#fffff' }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Typography gutterBottom fontWeight={'bold'} marginLeft='15px'>Current Role: {group} </Typography>
        <Divider />
        {userProfile?.app?.roles.map((role) => (
          <MenuItem key={role} onClick={() => handleSwitchGroup(role)}>
            <Typography>Impersonate {role}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <LogoutMenuItem />
        <Divider />
        <MenuItem onClick={handleShowBorder}>
          <Typography>Highlight Retool</Typography>
        </MenuItem>
      </Menu>

    </div>
  );
};

const LogoutMenuItem = () => {
  const { logout } = useAuth0();
  return (
    <MenuItem key="auth0-logout">
      <Button
        style={{ color: "#000000" }}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </Button>
    </MenuItem>
  );
};

export default Topbar;
