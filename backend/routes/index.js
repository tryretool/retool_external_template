// Require the Express module and assign it to the 'express' variable
var express = require('express');

// Create a new router using the 'express.Router()' method
var router = express.Router();

// Define a route for the root URL of the application using the 'router.get()' method
router.get('/', function(req, res) {
  // When a GET request is made to the root URL, render the 'index' view using the 'res.render()' method
  res.render('index');
});

// Export the router so it can be used in other parts of the application
module.exports = router;
