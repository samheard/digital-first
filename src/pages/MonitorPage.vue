<!-- Page to receive observations
Use a webserver for the actual figures @ -->

<template>
  <q-page padding>
    <div class="row justify-around">
      <!-- Blood pressure not yet implemented
      <q-card>
        <q-card-section>
          <div class="text-h6">Blood Pressure</div>
        </q-card-section>
        <q-card-section>
          <q-range
            v-model="BP"
            vertical
            reverse
            drag-range
            markers="5"
            color="red-9"
            :min="0"
            :max="250"
            label-always
            track-color="grey-5"
            track-size="20px"
          />
        </q-card-section>
      </q-card>
    -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Heart Rate</div>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="HR"
            :min="0"
            :max="350"
            color="red"
            vertical
            reverse
            label-always
            track-size="10px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">HR: {{ HR }}</div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Oxygen Sats</div>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="SO2"
            :min="0"
            :max="100"
            color="blue"
            vertical
            reverse
            label-always
            track-size="10px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">SO2: {{ SO2 }}</div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Temperature</div>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="temperature"
            :min="30.0"
            :max="42.9"
            color="blue"
            vertical
            reverse
            label-always
            track-size="10px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Temperature: {{ temperature }}</div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Resp Rate</div>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="resp"
            :min="0"
            :max="100"
            color="blue"
            vertical
            reverse
            label-always
            track-size="10px"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Respiration: {{ resp }}</div>
        </q-card-section>
      </q-card>

      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">ECG</div>
        </q-card-section>
        <q-card-section>
          <q-img>
            <q-img src="ECGanimation.gif" style="width: 400px" />
          </q-img>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MonitorPage",

  setup() {
    return {
      BP: ref({
        min: 60,
        max: 110,
      }),
      HR: ref(80),
      SO2: ref(98),
    };
  },
};
</script>
