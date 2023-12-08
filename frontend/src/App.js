import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import RetoolWrapper from "./components/RetoolWrapper";

import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import { homepage, formattingPreferences, cloudFlare} from "../config";
import jwt from 'jsonwebtoken'; 
import jwksClient from 'jwks-rsa';
import axios from 'axios';

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
  const AUD = cloudFlare.testPolicyAud;
  const TEAM_DOMAIN = cloudFlare.teamDomain;
  const CERTS_URL = `${TEAM_DOMAIN}/cdn-cgi/access/certs`;
  const IDENTITY_URL = `${TEAM_DOMAIN}/cdn-cgi/access/get-identity`;

    useEffect(() => {
      const authenticateUser = async () => {
        try {

          const token = getCookie('CF_Authorization');
          //const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjYjNiMDNkOTQ1ZGU1YWE4Njc4ZmIxN2M3MDQxODkwMzAzN2Q4MmM0NjBkOWE3ZGNjOTVlNTA3ZDcyMGY1MGQifQ.eyJhdWQiOlsiNDUwYzY1YjBjZmYyYzUwZjg0MjlmOWVlZTE1OTQ5NzEzMDQ4ZGZkY2QzZDE3MGRjNTVjYWI1YjNlZjkyMzhiYSJdLCJlbWFpbCI6Imxsb3lkQGJ5bWlsZXMuY28udWsiLCJleHAiOjE3MDIwNTA4NjAsImlhdCI6MTcwMTk2NDQ2MCwibmJmIjoxNzAxOTY0NDYwLCJpc3MiOiJodHRwczovL2J5bWlsZXMuY2xvdWRmbGFyZWFjY2Vzcy5jb20iLCJ0eXBlIjoiYXBwIiwiaWRlbnRpdHlfbm9uY2UiOiJrOFVMTE9rMlp2RkR3dXEwIiwic3ViIjoiMzA5YWUxOTgtMDY1NS00ZDU4LWFiOWItNDNlMzFmZDU4YWUxIiwiY291bnRyeSI6IkdCIn0.NkCNzKPHKeMm3TOcJ4RBj0WJKEgpbFfE-72IAEoKy0191dOQXCQRXmZywkGhZ9-GYZcKpuFO4SltG-rvYan7L9EzwoghZb2BJI87gF6C2i3vH1xGKVcaBmQIsqbG2T9WpFEY4pQi2ZyW-ftZxZ2ea2q_6s-bxbhAaAgp9Cyjp-TO9eD5nbJ8jXIY13bzhN0l_OkrBSg8RbKBGdmgqfurT1iyXM9HJlRvGZMI4sR7oa2y0dRGySIsIZmBxaE3Dg0OlWhR2Ud2yBuLOljkvY-5yfOMOv7blQKaXWhtbJQ22tYRH2MiZTrm7wm1mDjHgPEKmQmuiHz4_uJWuawO8PNCHQ";
  
          if (!token) {
            console.error('Missing required CF Authorization token');
            return;
          } 

          const decodedUser = await verifyToken(token);
          console.log('Decoded User:', decodedUser);

          // Fetch the full identity from the Cloudflare Access Identity API
          const fullIdentity = await getFullIdentity(token);
          console.log('Full Identity:', fullIdentity);

          const { email, groups } = decodedUser;

          setUserProfile({
            user: {
              user: email,
              group: groups,
            },
          });

          setAccessToken(token);
          setIsAuthenticated(true);
  
        } catch (error) {
          console.error('Authentication failed:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      authenticateUser();
    }, []);

    const getFullIdentity = async (token) => {
      const apiUrl = IDENTITY_URL;
    
      // Set the CF_Authorization cookie in the request headers
      const headers = {
        Cookie: `CF_Authorization=${token}`,
      };
    
      // Make a request to the Cloudflare Access Identity API
      const response = await axios.get(apiUrl, { headers });
    
      return response.data;
    };    

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
        Access denied
      </Routes>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexGrow: 1, backgroundColor: formattingPreferences.backgroundColor }}>
      <Routes>
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
