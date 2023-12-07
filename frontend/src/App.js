import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RetoolWrapper from "./components/RetoolWrapper";

import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import SplashPage from "./pages/SplashPage";
import { homepage, formattingPreferences} from "../config";
import QuickLogin from "./pages/QuickLogin";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState({
    user: {
      user: 'lloyd+retoolviewer@bymiles.co.uk',
      group: 'admin',
    },
  });
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);
  const [sidebarList, setSidebarList] = useState([]);
  const [showBorder, setShowBorder] = useState(false);
  const [font, setFont] = useState('Retool Default')
  const location = useLocation();  


  useEffect(() => {
    const authenticateUser = async () => {
      // TODO: Check if the user has a valid session or JWT token
      // If authenticated, set isAuthenticated to true, fetch user data, and get an access token

      try {
        // Simulating a successful authentication
        setIsAuthenticated(true);

        // Simulating user data retrieval
        const user = { user: 'lloyd+retoolviewer@bymiles.co.uk', group: 'admin' };
        setUser(user);
        
        // Simulating getting an access token
        const token = await fetchAccessToken(); 
        setAccessToken(token);

      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }


    };
    authenticateUser();
  }, []);

  const fetchAccessToken = async () => {
    // TODO: Add implementation to validate Cloudflare JWT token and get an access token
    // https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/#javascript-example
    
    //const response = await fetch("your_access_token_endpoint");
    //const data = await response.json();
    //return data.access_token;

    // Simulating returning a JWT
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDA2MDYwMzIsImV4cCI6MTczMjE0MjAzMiwiYXVkIjoibG9jYWxob3N0OjMwMDEiLCJzdWIiOiJsbG95ZCtsb2NhbHJldG9vbEBieW1pbGVzLmNvLnVrIiwiR2l2ZW5OYW1lIjoiTGxveWQiLCJTdXJuYW1lIjoiSG9sbWFuIiwiRW1haWwiOiJsbG95ZCtsb2NhbHJldG9vbEBieW1pbGVzLmNvLnVrIiwiR3JvdXAiOiJBZG1pbiJ9._pd6nylHVRE_4r570Vqznozzc3Pgu31tuuvKIX_kAlI'
  };

  useEffect(() => {
    setFont('Retool Default');
  }, [location.pathname]);

  /**
   * Sets the user's current group, which serves to demonstrate dynamic RBAC-based features
   * Updates the userProfile state variable
   * @param {string} group - group to set as user's current group
   */
  const handleSwitchGroup = (group) => {
    setUserProfile({
      ...userProfile,
      ...{
        user: {
          group: group,
        },
      },
    });
    
  };

  useEffect(() => {

    let isAdmin = userProfile?.user?.group === "admin";
    if (isAdmin) {
      setSidebarList(homepage.sidebarList);
    } else {
      const filteredSidebar = homepage.sidebarList.filter(
        (item) =>
          item.groups.length === 0 ||
          item.groups.includes(userProfile?.user?.group)
      );
      setSidebarList(filteredSidebar);
    }
  }, [userProfile]);

  if (isLoading) return "";

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/quicklogin" element={<QuickLogin />} />
        <Route path="*" element={<SplashPage />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexGrow: 1, backgroundColor: formattingPreferences.backgroundColor }}>
      <Routes>
        <Route path="/login" element={<SplashPage />} />
        <Route
          path="/"
          element={
            <LayoutWrapper
              drawerIsOpen={drawerIsOpen}
              userProfile={userProfile}
              user={user}
              handleSwitchGroup={handleSwitchGroup}
              toggleDrawer={() => setDrawerIsOpen(!drawerIsOpen)}
              sidebarList={sidebarList}
              handleShowBorder={() => setShowBorder(!showBorder)}
              handleSetFont={setFont}
              activeFont={font}
              formatting={formattingPreferences}
            />
          }
        >
          {sidebarList.map((item) => (
            <Route
              key={`/` + item.slug}
              path={`/` + item.slug}
              element={
                <RetoolWrapper
                  retoolAppName={item.retoolAppName}
                  accessToken={accessToken}
                  showBorder={showBorder}
                  key={1}
                  userProfile={userProfile}
                  activeFont={font}
                />
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Box>
  );
};

const LayoutWrapper = ({ toggleDrawer, ...rest }) => (
  <>
    <CssBaseline />
    <Topbar onToggleDrawer={toggleDrawer} {...rest} />
    <Sidebar onClick={toggleDrawer} {...rest} />
    <Outlet />
  </>
);

export default App;
