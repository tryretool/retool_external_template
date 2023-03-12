exports.deployOnLocalhost = true;

// To get your Auth0 Domain, and ClientID, see this guide https://auth0.com/docs/quickstart/spa/react#configure-auth0

exports.auth = {
  tokenDuration: "1800s",
  REACT_APP_AUTH0_DOMAIN: "YOUR_AUTH0_DOMAIN",
  REACT_APP_AUTH0_CLIENT_ID: "YOUR_AUTH0_DOMAIN",
  REACT_APP_AUTH0_SCOPE: "read:current_user update:current_user_metadata",
};

exports.homepage = {
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


exports.darkModeFormatting = {
  darkModePalette: {
    backgroundColor: '#080928',
    text: '#ffffff',
    elevation: 0
  },
  lightModePalette: {
    backgroundColor: '#ffffff',
    text: '#080928',
    elevation: 1
  }
}