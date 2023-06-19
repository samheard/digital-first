// routes array of path objects for the router

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // "Index page" ie main access point
      { path: "/", component: () => import("pages/CallerPage.vue") },
      // Page to control entry to kiosk
      { path: "/entry", component: () => import("pages/EntryPage.vue") },
      // Video camera feeds
      { path: "/video", component: () => import("pages/VideoPage.vue") },
      // Observations page
      { path: "/monitor", component: () => import("pages/MonitorPage.vue") },
      // Control Dispensing cupboard
      { path: "/dispense", component: () => import("pages/DispensePage.vue") },
    ],
  },

  // Catchall default if user enters another unrecognized route
  // leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

// Make routes available to other pages
export default routes;
