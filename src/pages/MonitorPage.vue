<template>
  <q-page padding>
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
    };
  },
};
</script>
