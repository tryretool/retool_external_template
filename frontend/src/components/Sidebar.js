import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Divider,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    color: "#ffffff",
    background: "#f5f5f5",
    position: "relative",
    whiteSpace: "nowrap",
    width: 250,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = ({
  drawerIsOpen = true,
  sidebarList,
  onClick,
}) => {
  return (
    <Drawer variant="permanent" open={drawerIsOpen}>
      <Box display="flex" justifyContent="space-between" marginTop="24px">
        <Box display="flex">
          <img
            src="https://theme.zdassets.com/theme_assets/2394985/82fdd1430ffe8b0d165164cb129affbf5e918726.svg"
            width="100%"
          />
        </Box>
        <Box alignSelf="flex-end">
          <IconButton style={{ color: "#000000" }} onClick={onClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ overflow: "auto", color: "#000000" }} marginTop="40">
        <List disablePadding={true}>
          {sidebarList.map((item) => (
            <React.Fragment key={item.slug}>
              <Link
                to={{ pathname: item.slug }}
                component={RouterLink}
                underline="none"
              >
                <ListItem
                  button
                  sx={{
                    left: 2.5,
                  }}
                >
                  <ListItemIcon style={{ color: "#000000" }}>
                    <Icon color="#000000">{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      left: -20,
                    }}
                  />
                </ListItem>
              </Link>
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Box>
      
    </Drawer>
  );
};

export default Sidebar;
