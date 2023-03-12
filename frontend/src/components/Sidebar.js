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
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
} from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    color: "#ffffff",
    background: "#080928",
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

const DarkModeToggle = ({ handleDarkModeToggle, darkModeTopbar }) => (
  <FormGroup>
    <FormControlLabel
      control={<Switch onChange={handleDarkModeToggle} checked={darkModeTopbar} />}
      label="Dark Mode"
    />
  </FormGroup>
);

const FontSelector = ({ font, handleSetFont }) => (
  <FormControl variant="filled" fullWidth>
    <InputLabel id="font-select-label" style={{ color: "#080928" }}>
      Active font
    </InputLabel>
    <Select
      labelId="font-select-label"
      id="font-select"
      value={font}
      onChange={(evt) => handleSetFont(evt.target.value)}
      style={{ background: "white" }}
    >
      <MenuItem value={"Retool Default"}>Retool Default</MenuItem>
      <MenuItem value={"Arial"}>Arial</MenuItem>
      <MenuItem value={"Calibri"}>Calibri</MenuItem>
      <MenuItem value={"Courier New"}>Courier New</MenuItem>
      <MenuItem value={"Helvetica"}>Helvetica</MenuItem>
      <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
    </Select>
  </FormControl>
);

const Sidebar = ({
  drawerIsOpen = true,
  sidebarList,
  onClick,
  activeFont,
  handleSetFont,
  handleDarkModeToggle,
  darkModeTopbar
}) => {
  return (
    <Drawer variant="permanent" open={drawerIsOpen}>
      <Box display="flex" justifyContent="space-between" marginTop="24px">
        <Box display="flex">
          <img
            src="https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png"
            width="100%"
          />
        </Box>
        <Box alignSelf="flex-end">
          <IconButton style={{ color: "#ffffff" }} onClick={onClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ overflow: "auto", color: "#ffffff" }} marginTop="40">
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
                  <ListItemIcon style={{ color: "#ffffff" }}>
                    <Icon color="#ffffff">{item.icon}</Icon>
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
      <Box position={"fixed"} bottom={"15"} width={"220"} marginLeft={"15"}>
        {drawerIsOpen && (
          <FontSelector font={activeFont} handleSetFont={handleSetFont} />
        )}
      </Box>
      <Box position={"fixed"} bottom={"75"} width={"220"} marginLeft={"50"}>
        {drawerIsOpen && (
          <DarkModeToggle handleDarkModeToggle={handleDarkModeToggle} darkModeTopbar={darkModeTopbar} />
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
