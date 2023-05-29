<template>
  <q-page class="flex flex-center">
    <div class="full-width" style="max-width: 500px">
      <q-card class="q-pa-sm q-ma-md">
        <h5>Allowing access to the Kiosk</h5>
        <q-card-section>
          <q-toggle
            v-model="kioskAccess"
            label="Turn on door video"
            left-label
            color="primary"
          />
          <q-knob
            aria-readonly="true"
            min:5
            max:50
            :step="5"
            value="27"
            show-value
            size="70px"
            thickness="0.22"
            track-color="red-3"
            class="primary q-ma-md"
          >
          </q-knob>
          indoor temp.
        </q-card-section>
        <q-card-section v-if="kioskAccess">
          <!-- <q-video
            src="https://?"
            autoplay /> -->

          <q-img
            class="q-pb-md background-color: grey-3"
            src="https://picsum.photos/300/300"
            spinner-color="white"
            style="height: 400px; max-width: 500px"
            mode="cover"
          />
          <q-btn
            v-on="{ mousedown: playsound, mouseup: stopsound }"
            class="full-width"
            fill
            color="primary"
            label="Open Door to Kiosk"
            :disable="!kioskAccess"
          />
        </q-card-section>
        <q-card-section>
          <q-toggle
            v-model="aircon"
            label="Turn on aircon"
            left-label
            color="primary"
          />
          <q-toggle
            v-model="lights"
            label="Turn on lights"
            left-label
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "EntryPage",

  methods: {
    playsound() {
      this.buzz.play();
    },
    stopsound() {
      this.buzz.stop();
    },
  },

  setup() {
    let buzz = new Audio("/door-buzzer.mp3");

    return {
      kioskAccess: ref(false),
      aircon: ref(false),
      lights: ref(false),
      buzz,
    };
  },
};
</script>
