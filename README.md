# Retool External Template

A React app that can be used as a template for embedding Retool Apps. It uses [Auth0 React SDK](https://auth0.github.io/auth0-react/) to add authentication, and [react-retool](https://www.npmjs.com/package/react-retool) wrapper for embedding the Retool apps. 

![Demo gif](docs/demo.gif)

## What is Retool Embed?
Retool Embed is a way to let external users––partners, vendors, customers––securely access embedded Retool apps within your product. You can use any authentication solution to give users access, and then control app behavior, data access, and audit usage on a per-user basis. You can learn more about Retool Embed [here](https://docs.retool.com/docs/embed-retool-apps).

## How Retool Embed works
Retool Embed doesn't change much in how you build in Retool. You still use resources, components, and queries to build your apps.

1. External user signs into your portal
2. Your portal tells Retool they have access to Retool apps A, B, and C
3. Retool generates a secure embed link
4. Your portal loads the embedded Retool apps

You can learn more about [how Retool Embed works here.](https://docs.retool.com/docs/retool-embed#how-retool-embed-works)

## Requirements
## Requirements

This template requires Node.js version 16.14.2 or higher. Please make sure that you have Node.js installed before running the application. You can download Node.js from the official website: https://nodejs.org/

If you have a different version of Node.js installed on your machine, you can use a version manager like [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) to switch between different versions. 

$ `nvm install 16.14.2`

$ `nvm use 16.14.2`

$ `node -v`

## Getting Started

1. Clone repo
2. Setup the Frontend
    - Run `cp frontend/config-example.js frontend/config.js` 
    - Update `frontend/config.js` with your Auth0 credentials (Domain and ClientID). See [this guide](https://auth0.com/docs/quickstart/spa/react#configure-auth0).
3. Setup the Backend
    - Run `cp backend/.env.example backend/.env` 
    - Update `backend/.env` file to configure your RETOOL_API_KEY, RETOOL_URL, and BACKEND_PORT.
4. Run `yarn install`
5. Run `./start`
6. Open `http:\\localhost:3001` in browser

## More Configuration
Most of the configuration is inside the `frontend/config.js`, including names of Retool Apps to embed, Auth0 credentials, Sidebar links, Formatting preferences (colors, fonts). 

## Repo structure
Mono-repo. Single project, but each of frontend and backend can be run separately.

### Frontend is a React app served from `/frontend/app.js`.

```
└── frontend/
    ├── public/
    │   ├── index.html  // HTML file for the React app
    ├── src/
    │   ├── App.js      // main component that renders the app
    │   ├── index.js    // entry point for the app
    │   ├── index.css   // CSS file for the index.html file
    │   └── components/ // directory containing reusable React components
    │       ├── Auth0ProviderWithHistory.js // component for authenticating users with Auth0
    │       ├── RetoolWrapper.js // component for wrapping Retool components. Makes a POST request to the backend to get the embed URL (route for the POST request is specified in backend/routes/retool.js)
    │       ├── Sidebar.js // component for a sidebar navigation menu
    │       └── Topbar.js // component for a top navigation bar
    │   └── pages/ // includes the splash page for login    
    ├── package.json    // file for managing dependencies
```

### Backend is an Express server served from `/backend/server.js`.

```
└── backend/
    ├── public/                // directory for serving static files
    │   └── index.html         // HTML file for the server's default page
    ├── routes/                 // directory containing route handlers
    │   ├── index.js            // entry point for the routes directory
    │   ├── retool.js           // route handler for the /api/embedUrl endpoint. Makes a request to Retool to get the embed URL.
    ├── utils/                 // directory for utility functions
    │   └── retoolAppsToUuids.js // utility function for converting Retool app names to UUIDs
    ├── server.js               // entry point for the server. Specifies the router files to use (index.js, retool.js)
    ├── package.json           // file for managing dependencies
```