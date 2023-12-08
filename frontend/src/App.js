import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import RetoolWrapper from "./components/RetoolWrapper";

import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import SplashPage from "./pages/SplashPage";
import { homepage, formattingPreferences} from "../config";
import jwt from 'jsonwebtoken'; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);
  const [sidebarList, setSidebarList] = useState([]);
  const [showBorder, setShowBorder] = useState(false);
  const [font, setFont] = useState('Retool Default')
  const location = useLocation();  
  const AUD = process.env.POLICY_AUD;
  const TEAM_DOMAIN = process.env.TEAM_DOMAIN;
  const CERTS_URL = `${TEAM_DOMAIN}/cdn-cgi/access/certs`;

    useEffect(() => {
      const authenticateUser = async () => {
        try {
          const token = getCookie('CF_Authorization');
  
          if (!token) {
            console.error('Missing required CF Authorization token');
            return;
          }
  
          const decodedUser = await verifyToken(token);
          console.log('Decoded User:', decodedUser);

          const { user, group } = decodedUser;

          setUserProfile({
            user: {
              user: user,
              group: group,
            },
          });
  
        } catch (error) {
          console.error('Authentication failed:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      authenticateUser();
    }, []);
  
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };
  
    const verifyToken = async (token) => {
      const decodedUser = await verifyTokenWithCloudflare(token);
      return decodedUser;
    };
  
    const verifyTokenWithCloudflare = async (token) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, { audience: AUD }, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
    };
  
    const getKey = (header, callback) => {
      const client = jwksClient({
        jwksUri: CERTS_URL
      });

      client.getSigningKey(header.kid, function (err, key) {
        if (err) {
          callback(err);
        } else {
          callback(null, key.getPublicKey());
        }
      });
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
    <Outlet />
  </>
);

export default App;
