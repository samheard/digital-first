<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section horizontal>
        <q-card-section style="max-width: 400px">
          <q-video
            src="https://www.youtube.com/embed/CNlfS7F58Ic"
            @click="showLargeVideo()"
          />
        </q-card-section>
        <q-card-section style="max-width: 400px">
          <q-video
            src="https://www.youtube.com/embed/AShFZ1XJFqg"
            @click="showLargeVideo()"
          />
        </q-card-section>
        <q-card-section style="max-width: 400px">
          <q-video
            src="https://www.youtube.com/embed/YRNxwX-9EUE"
            @click="showLargeVideo()"
          />
        </q-card-section>
        <q-card-section style="max-width: 400px" vertical left>
          <q-card-section>
            <!-- <video style="max-width: 200px" ref="videoplay" autoplay></video> -->
            <!-- <q-video ref="videoplay" style="max-width: 200px" autoplay>
            </q-video> -->
          </q-card-section>
          <q-card-section class="text-center">
            <q-btn
              v-if="!cameraStart"
              label="Start camera"
              color="primary"
              icon="play_arrow"
              :disable="!enableCamera"
              @click="useCamera"
            />
            <q-btn
              v-else
              label="Stop camera"
              color="primary"
              icon="stop"
              @click="stopCamera"
            />
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section class="text-center">
        <!-- <q-video
          id="largeVideo"
          :ratio="560 / 315"
          background="black"
          src="https://www.youtube.com/embed/CNlfS7F58Ic"
        /> -->
        <video background="black" ref="videoplay" autoplay></video>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "VideoPage",

  data() {
    return {
      cameraStart: false,
      enableCamera: false,
    };
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.enableCamera = true;
    }
  },
  methods: {
    useCamera() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.cameraStart = true;
          this.$refs.videoplay.srcObject = stream;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    stopCamera() {
      this.cameraStart = false;
      this.$refs.videoplay.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    },
    showLargeImage(event) {
      const largeVideo = document.getElementById("largeVideo");
      largeVideo.src = event.target.src;
    },
  },
});
</script>
