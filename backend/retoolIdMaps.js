// Define mappings for frontend/config.js's  retoolAppName values to Retool app UUIDs
const retoolAppMap = {
   storeManager: "966bf7fc-9057-11ed-bb00-b78554d89588",
   orderHistory: "56a70878-5e43-11ed-b603-5f3bd9271091",
   couponGenerator: "69176596-4009-11ed-92e5-13ce361830e2",
   customViews: "32ecf700-44ab-11ed-8cc2-eb54dae5f4e2"
};

// Define a fallback group in case the user's IDP group is not in the mapping
// You can find group IDs from your Permissions settings page (/settings/permissions) and selecting the "..." menu
const fallbackRetoolGroupId = 0 // Typically your "External Users" group in Retool. Do not leave as 0.

// Map of Auth0 user_metadata.group to Retool group ID
// You can leave idpGroupToRetoolGroupMap as an empty object if you don't want to use this feature, but do not leave values as 0
const idpGroupToRetoolGroupMap = {
   external: 0,
   bronze: 0,
   silver: 0,
   gold: 0,
}

module.exports = { retoolAppMap, fallbackRetoolGroupId, idpGroupToRetoolGroupMap };