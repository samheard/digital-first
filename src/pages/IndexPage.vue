<template>
  <q-page class="flex column">
    <div class="q-pa-md">
      <h3>Caller Details</h3>
      <q-form class="q-gutter-md" style="max-width: 400px">
        <q-input
          outlined
          name="phonenumber"
          v-model="PhoneNumber"
          label="Phone number"
          type="text"
        />
        <q-input
          outlined
          name="firstname"
          v-model="FirstName"
          label="First name"
          type="text"
        />
        <q-input
          outlined
          name="lastname"
          v-model="LastName"
          label="Last name"
          type="text"
        />
        <q-input
          outlined
          name="dateofbirth"
          v-model="DateOfBirth"
          label="Date of birth"
          type="date"
          placeholder="dd/mm/yyyy"
        />

        <q-select
          clearable
          filled
          label="Locality"
          v-model="locality"
          :options="options"
          :loading="loading"
        >
          <!-- :options="localityOptions"
          Attempt to get the locations to load from the database -->

          <template v-slot:prepend>
            <q-icon name="place" @click.stop.prevent />
          </template>
        </q-select>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    //for the options in the locality select
    return {
      locality: null,
      options: [],
      loading: false,
    };
  },
  mounted() {
    //not sure if I need loading for this but probably stops clashes in future
    this.loading = true;

    this.$axios
      .get("http://localhost:3000/locales/idandname/")
      .then((response) => {
        console.log(response);
        this.options = response.data.data.map((item) => ({
          label: item.LocalityName,
          value: item.id,
        }));
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          message: "Error loading locations",
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  setup() {
    //Data for client
    return {
      DateOfBirth: ref(null),
      LastName: ref(null),
      FirstName: ref(null),
      PhoneNumber: ref(null),
    };
    // Now have live call to database
    // localityOptions: [
    //   //this.$axios.get("/api/locales/idandname"),
    //   { label: "Imanpa", value: "1" },
    //   { label: "Yulara", value: "3" },
    //   { label: "Erldunda", value: "1" },
    // ],
  },
});
</script>
