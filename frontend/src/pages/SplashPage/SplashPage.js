import React from "react";
import { Button, Box, Paper } from "@mui/material";
import "./styles.css";

// Define a React component called SplashPage
const SplashPage = () => {
  // Use the useAuth0 hook from the Auth0 React library to get the loginWithRedirect function
  const { loginWithRedirect } = useAuth0();

  // Return a JSX element that displays a login form with a background image and text
  return (
    <Paper className="bg">
      <Box className="login-container">
        <img
          src="https://www.bymiles.co.uk/wp-content/themes/bymiles%20v27.07.2021-B/src/assets/bymiles-logo.svg"
          width="300px"
        />
        <h3 className="title"> Claims portal </h3>
        <p>
          Log in to view By Miles live policy information.
        </p>
        <Button
          className="login"
          key="auth0-login"
          onClick={() => loginWithRedirect()}
          variant="contained"
        >
          Log in
        </Button>
      </Box>
    </Paper>
  );
};

// Export the SplashPage component as the default export of this module
export default SplashPage;
