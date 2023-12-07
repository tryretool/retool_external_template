import React from "react";
import { useNavigate } from "react-router-dom"
import { auth } from '../../config'

export const JWTProvider = ({ children }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  };

  return (

  null
    )

}