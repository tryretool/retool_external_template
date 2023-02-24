import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Retool from 'react-retool'

const RetoolWrapper = ({
  retoolAppName = "",
  accessToken = "",
  userProfile = {},
  showBorder = false,
  darkMode = false,
  activeFont = ""
}) => { 

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState('')

  useEffect(() => {
    // make a POST request to the backend to get the embed URL
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ retoolAppName, accessToken, userProfile })
    };
    fetch('/api/embedUrl', options)
    .then(res => res.json())
    .then(data => { setRetoolEmbedUrl(data.embedUrl)})
  }, [retoolAppName])
  
  // if embed URL is available, return the Container and Retool components
  return retoolEmbedUrl && (
    <Container maxWidth={false} disableGutters style={{ marginTop: 66, border:  showBorder ? '5px dashed #FFD4D2' : 'none', boxShadow: "none"}}>
        <Retool url={retoolEmbedUrl} data={{darkMode, font: activeFont}} />
    </Container>
  )
}

export default RetoolWrapper