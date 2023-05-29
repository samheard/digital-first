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
          v-model="locality"
          :options="localityOptions"
          label="Locality"
        >
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

  setup() {
    return {
      locality: ref(null),
      DateOfBirth: ref(null),
      LastName: ref(null),
      FirstName: ref(null),
      PhoneNumber: ref(null),

      localityOptions: [
        //axios.get("/api/locales"),
        { label: "Imanpa", value: "1" },
        { label: "Yulara", value: "3" },
        { label: "Erldunda", value: "1" },
      ],
    };
  },
});
</script>
