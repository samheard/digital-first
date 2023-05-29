const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/entry", component: () => import("pages/EntryPage.vue") },
      { path: "/video", component: () => import("pages/VideoPage.vue") },
      { path: "/monitor", component: () => import("pages/MonitorPage.vue") },
      { path: "/dispense", component: () => import("pages/DispensePage.vue") },
      { path: "/test", component: () => import("pages/TestPage.vue") },
      { path: "/search", component: () => import("pages/testSearch.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
