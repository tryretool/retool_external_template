import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom"
import { auth } from '../../config'

export const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  };

  return (
    <Auth0Provider
      domain={auth.REACT_APP_AUTH0_DOMAIN}
      clientId={auth.REACT_APP_AUTH0_CLIENT_ID}
      audience={`https://${auth.REACT_APP_AUTH0_DOMAIN}/api/v2/`}
      scope={auth.REACT_APP_AUTH0_SCOPE}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}