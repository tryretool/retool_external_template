exports.deployOnLocalhost = false;

exports.homepage = {
  sidebarList: [
    {
      title: "By Miles Claims Portal",
      retoolAppName: "claimsPortal",
      icon: "home",
      slug: "",
      groups: ["admin", "ByMilesClaimsPortal_Viewer"],
    },
  ],
};
exports.theme = {
  palette: {
    primary: {
      main: "#000000",
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
  backgroundColor: "#f5f5f5",
  text: "#080928",
  elevation: 1,
};
