// Require the dotenv module to load environment variables from a .env file.
require('dotenv').config();

// Require the node-fetch and express modules.
var fetch = require('node-fetch');
var express = require('express');

// Create a new router instance.
var router = express.Router();

// Import the Retool app map utility function.
var retoolAppMap = require('../utils/retoolAppsToUuids')

// Define a route for retrieving an embedded Retool URL.
router.post('/embedUrl', (req, res) => {
  // Parse the JWT access token.
  const parsedToken = JSON.parse(atob(req.body.accessToken.split('.')[1]))

  // Get the user group from the request.
  const group = req.body.userProfile.user.group

  // Set the API request options for the Retool API.
  const options = {
    method: "post",
    headers: {
      'Authorization': `Bearer ${process.env.RETOOL_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      "landingPageUuid": retoolAppMap[req.body.retoolAppName],
      "externalIdentifier": parsedToken.azp,
      "groupIds": [1],
      "metadata": {
        "group": group,
        "mode" : 'dark'
      }
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
