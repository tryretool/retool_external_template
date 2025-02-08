// Require the dotenv module to load environment variables from a .env file.
require('dotenv').config();

// Require the node-fetch and express modules.
var fetch = require('node-fetch');
var express = require('express');

// Create a new router instance.
var router = express.Router();

// Import the Retool app map utility function.
var { retoolAppMap, fallbackRetoolGroupId, idpGroupToRetoolGroupMap } = require('../retoolIdMaps')

// Define a route for retrieving an embedded Retool URL.
router.post('/embedUrl', async (req, res) => {

  // Parse the JWT access token.
  const parsedToken = JSON.parse(atob(req.body.accessToken.split('.')[1]))

  // Get user info from issuer API
  const userInfoRequestUrl = `${parsedToken.iss}api/v2/users/${parsedToken.sub}`
  const userInfoRequest = await fetch(userInfoRequestUrl, {
    headers: {
      Authorization: `Bearer ${req.body.accessToken}`,
    }
  })
  const userInfoResponse = await userInfoRequest.json()

  // Determine which Retool group ID to pass to the Retool Embed API
  const retoolGroupId = idpGroupToRetoolGroupMap[userInfoResponse?.user_metadata?.group] ?? fallbackRetoolGroupId

  // Set the API request options for the Retool API Embed API
  const options = {
    method: "post",
    headers: {
      'Authorization': `Bearer ${process.env.RETOOL_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ // See https://docs.retool.com/apps/guides/app-management/embed-apps#3-create-an-embed-url for all attributes
      "landingPageUuid": retoolAppMap[req.body.retoolAppName], // The UUID of the Retool app you want to embed
      "externalIdentifier": parsedToken.sub, // External identifier for the user in Retool
      "groupIds": [retoolGroupId], // List of Retool group IDs to add this user to. Be sure they have access to the app you're embedding.
      "userInfo": { // (optional) Retool user info, can include email, firstName, and/or lastName
        "email": userInfoResponse.email
      },
      "metadata": userInfoResponse.user_metadata // (optional) Auth0 user_metadata passed into Retool user metadata/attributes
    })
  }

  // Send a request to the Retool API to retrieve the embedded URL.
  fetch(`https://${process.env.RETOOL_URL}/api/embed-url/external-user`, options)
  .then(data => data.json())
  .then(json => res.send(json))
  .catch(e => console.log(e.message))
})

// Export the router for use in other modules.
module.exports = router;
