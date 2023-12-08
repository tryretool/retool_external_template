exports.deployOnLocalhost = false;

exports.cloudFlare = {
  testPolicyAud: "450c65b0cff2c50f8429f9eee15949713048dfdcd3d170dc55cab5b3ef9238ba",
  prodPolicyAud: "f4a2fd663c0766bcf31963fc7819f64c2439aa76f99acbb02d67f17f8f6bd635",
  teamDomain: "https://bymiles.cloudflareaccess.com",
}

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
