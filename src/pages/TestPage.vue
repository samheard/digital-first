<template>
  <q-page padding class="flex column">
    <q-form @submit="submitCaller" class="q-gutter-md" style="max-width: 400px">
      <q-card>
        <q-card-section>
          <q-select
            name="Search"
            hide-dropdown-icon
            clearable
            filled
            label="Search"
            emit-value
            placeholder="Type a date of birth or part of first and last names"
            v-model="search"
          />
        </q-card-section>
        <q-card-section>
          {{ this.FirstName }} {{ this.LastName }}: {{ this.DateOfBirth }}
          {{ this.PhoneNumber }}
        </q-card-section>
      </q-card>
      <q-card>
        <q-input v-model="PhoneNumber" label="Phone Number" type="text" />
        <q-input v-model="FirstName" label="First Name" type="text" />
        <q-input v-model="LastName" label="Last Name" type="text" />
        <q-input
          outlined
          name="dateofbirth"
          v-model="DateOfBirth"
          label="Date of birth"
          type="date"
          placeholder="dd/mm/yyyy"
        />
        <q-input v-model="HouseNumber" label="House Number" type="text" />
        <q-input v-model="ClientAddress" label="Address" type="text" />
        <q-input v-model="Locality" label="Locality" type="text" />
        <q-input v-model="Notes" label="Notes" type="text" autogrow />
        <q-input v-model="Alert" label="Alert" type="text" autogrow />
        <q-input v-model="LocalityID" label="Locality ID" type="number" />
        <q-card-actions>
          <q-btn
            color="primary"
            label="Submit"
            type="submit"
            class="q-mt-md"
            style="max-width: 400px"
          />
          <q-btn
            flat
            color="primary"
            label="Reset"
            type="reset"
            class="q-mt-md"
            style="max-width: 400px"
          />
          <q-btn
            flat
            color="primary"
            label="Search"
            @click="getCaller"
            class="q-mt-md"
            style="max-width: 400px"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TestPage",

  data() {
    return {
      id: null,
      PhoneNumber: "",
      FirstName: "",
      LastName: "",
      DateOfBirth: "",
      LocalHealthID: "",
      HouseNumber: "",
      Locality: "",
      ClientAddress: "",
      Notes: "",
      Alert: "",
      LocalityID: "",
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

  methods: {
    async getCaller() {
      //An example 1983-01-07
      console.log(this.DateOfBirth);

      this.$axios
        .get(`http://localhost:3000/callers/dateofbirth/${this.DateOfBirth}`)
        .then((response) => {
          console.log(response.data.data[0]);
          this.id = response.data.data[0].id;
          this.PhoneNumber = response.data.data[0].PhoneNumber;
          this.FirstName = response.data.data[0].FirstName;
          this.LastName = response.data.data[0].LastName;
          this.DateOfBirth = response.data.data[0].DateOfBirth;
          this.LocalHealthID = response.data.data[0].LocalHealthID;
          this.HouseNumber = response.data.data[0].HouseNumber;
          this.Locality = response.data.data[0].Locality;
          this.ClientAddress = response.data.data[0].ClientAddress;
          this.Notes = response.data.data[0].Notes;
          this.Alert = response.data.data[0].Alert;
          this.LocalityID = response.data.data[0].LocalityID;
          console.log(this.FirstName);
        });
    },

    async submitCaller() {
      {
        const data = {
          id: this.id,
          PhoneNumber: this.PhoneNumber,
          FirstName: this.FirstName,
          LastName: this.LastName,
          DateOfBirth: this.DateOfBirth,
          LocalHealthID: this.LocalHealthID,
          HouseNumber: this.HouseNumber,
          Locality: this.Locality,
          ClientAddress: this.ClientAddress,
          Notes: this.Notes,
          Alert: this.Alert,
          LocalityID: this.LocalityID,
        };
        console.log(data);
        await this.$axios
          .post("http://localhost:3000/callers", data)
          .then((response) => {
            console.log(response);
          });
      }
    },
  },
};
</script>
