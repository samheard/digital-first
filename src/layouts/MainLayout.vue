<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Remote Call Centre</q-toolbar-title>
        <div>
          <q-btn
            flat
            dense
            round
            icon="info"
            aria-label="info"
            @click="toggleRightDrawer"
          />
        </div>
      </q-toolbar>
      <q-tabs>
        <q-route-tab to="/" exact name="call" label="Call" />
        <q-route-tab to="/entry" exact name="entry" label="Entry" />
        <q-route-tab to="/video" exact name="video" label="Video" />
        <q-route-tab to="/monitor" exact name="monitor" label="Monitor" />
        <q-route-tab to="/dispense" exact name="dispense" label="Dispense" />
        <q-route-tab to="/test" exact name="test" label="Test" />
        <q-route-tab to="/search" exact name="testSearch" label="TestSearch" />
      </q-tabs>
    </q-header>

    <q-drawer side="right" v-model="rightDrawerOpen" bordered>
      <!-- <q-list>
        <q-item-label header> Resources </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
      <q-list bordered class="rounded borders" title="Resources" color="grey-3">
        <q-expansion-item
          expand-separator
          label="Maps"
          default-opened
          class="bg-grey-4"
        >
          <q-card>
            <q-card-section>
              <a href="https://goo.gl/maps/jAkzZ4E8jVv5Xt5y5" target="_blank"
                >Imanpa (Google maps)</a
              >
              <!-- <q-btn
                flat
                round
                label=">>"
                @click="
                  window.open('https://goo.gl/maps/jAkzZ4E8jVv5Xt5y5', '_blank')
                    .focus
                "
              ></q-btn> -->
            </q-card-section>
            <!-- <q-card-actions>
              <q-btn
                flat
                round
                label="Alice Springs Hospital"
                @click="
                  window.open('https://goo.gl/maps/jAkzZ4E8jVv5Xt5y5', '_blank')
                    .focus
                "
              ></q-btn>
            </q-card-actions> -->
            <q-card-section>
              <a href="/ImanpaHouseMap.pdf" target="_blank"
                >Imanpa map & House No.</a
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Clinic Details">
          <q-expansion-item :header-inset-level="0.5" label="Imanpa">
            <q-card> Add details of clinics here </q-card>
          </q-expansion-item>
          <q-expansion-item :header-inset-level="0.5" label="Yulara">
            <q-card> Add details of clinics here </q-card>
          </q-expansion-item>
          <q-expansion-item
            :header-inset-level="0.5"
            label="Alice Springs Hospital"
          >
            <q-card> Add details of clinics here </q-card>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

// import EssentialLink from "components/EssentialLink.vue";

// const linksList = [
//   {
//     title: "Imanpa on Google Maps",
//     caption: "Google Maps",
//     icon: "school",
//     link: "https://goo.gl/maps/jAkzZ4E8jVv5Xt5y5",
//   },
//   {
//     title: "Imanpa House Map",
//     caption: "Coundil Slap Plan",
//     icon: "home",
//     link: "/ImanpaHouseMap.pdf",
//   },
//   {
//     title: "Yulara",
//     caption: "chat.quasar.dev",
//     icon: "chat",
//     link: "https://chat.quasar.dev",
//   },
//   {
//     title: "Kultukatjara",
//     caption: "forum.quasar.dev",
//     icon: "record_voice_over",
//     link: "https://forum.quasar.dev",
//   },
//   {
//     title: "Retrieval Service",
//     caption: "@quasarframework",
//     icon: "rss_feed",
//     link: "https://twitter.quasar.dev",
//   },
//   {
//     title: "Alice Springs Hospital",
//     caption: "@QuasarFramework",
//     icon: "public",
//     link: "https://facebook.quasar.dev",
//   },
//   {
//     title: "Emergency Services",
//     caption: "Community Quasar projects",
//     icon: "favorite",
//     link: "https://awesome.quasar.dev",
//   },
// ];

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
