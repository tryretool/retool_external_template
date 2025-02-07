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
  const [retoolEmbedError, setRetoolEmbedError] = useState(false)

  useEffect(() => {
    // make a POST request to the backend to get the embed URL
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ retoolAppName, accessToken, userProfile })
    };
    fetch('/api/embedUrl', options)
    .then(res => res.json())
    .then(data => { 
      if(data.embedUrl){
        setRetoolEmbedUrl(data.embedUrl)
      } else {
        console.error('An error occurred when requesting a Retool embed URL:', {data})
        setRetoolEmbedError(true)
      }
    })
  }, [retoolAppName])
  
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        marginTop: 66,
        border: showBorder ? '5px dashed #FFD4D2' : 'none',
        boxShadow: "none"
      }}
    >
      {retoolEmbedError && (
        <div style={{ color: 'red', padding: '1rem' }}>An error occurred while trying to retrieve your embed URL.</div>
      )}
      {retoolEmbedUrl && (
        <Retool url={retoolEmbedUrl} data={{ darkMode, font: activeFont }} />
      )}
    </Container>
  )
}

export default RetoolWrapper