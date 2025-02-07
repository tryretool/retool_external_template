exports.deployOnLocalhost = true;

// To get your Auth0 Domain, and ClientID, see this guide https://auth0.com/docs/quickstart/spa/react#configure-auth0

exports.auth = {
  tokenDuration: "1800s",
  REACT_APP_AUTH0_DOMAIN: "YOUR_AUTH0_DOMAIN",
  REACT_APP_AUTH0_CLIENT_ID: "YOUR_AUTH0_DOMAIN",
  REACT_APP_AUTH0_SCOPE: "read:current_user update:current_user_metadata",
};

exports.homepage = {
  // List of apps to show on the side bar navigation pane.
  // Be sure to map each `retoolAppName` to the corresponding Retool app UUID in the backend/retoolIdMaps.js file.
  // The `groups` array should match the Auth0 user_metadata.group values you have set up in Auth0.
  // Users will only see apps when their group (string) is in the sideBarList item's groups array.
  sidebarList: [
    {
      title: "Store manager",
      retoolAppName: "storeManager",
      icon: "home",
      slug: "",
      groups: ["bronze", "silver", "gold"],
    },
    {
      title: "Order history",
      retoolAppName: "orderHistory",
      icon: "attach_money",
      slug: "sales",
      groups: ["bronze", "silver", "gold"],
    },
    {
      title: "Coupon generator",
      retoolAppName: "couponGenerator",
      icon: "star",
      slug: "coupons",
      groups: [ "silver", "gold"],
    },
  ],
};
exports.theme = {
  palette: {
    primary: {
      main: "#ffffff",
      light: "#E06363",
      dark: "#972A2A",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
};
exports.formattingPreferences = {
    backgroundColor: '#ffffff',
    text: '#080928',
    elevation: 1
}