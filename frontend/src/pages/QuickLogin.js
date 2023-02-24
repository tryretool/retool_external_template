import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, Paper } from "@mui/material";

const QuickLogin = () => {
  const { loginWithRedirect } = useAuth0();
  //hit Auth0 on page load for this quicklogin route.
  useEffect(() => {
    loginWithRedirect();
  }, []);
  // returned loader just in case the above code hangs,
  // but in all likelyhood, the user will never see this return function
  return (
    <Paper className="bg">
      <Box className="login-container">
        <img
          src="https://i.ibb.co/SBfqNbc/imageedit-1-4156875095.png"
          width="300px"
        />
        <h3 className="title"> Merchant portal </h3>
        <p>Processing Automatic sign in</p>
        <CircularProgress />
      </Box>
    </Paper>
  );
};

export default QuickLogin;
