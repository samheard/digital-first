<!-- This template is the screen to find details about people calling and see where they live
ToDo: 1) Save changes made in the form back to the database - problem with "undefined" values being saved
  2) Add a new record when the form is filled because they cannot find someone
  3) Edit the record comes from the q-card that shows when a person is selected
  4) I currently have the edit form in the dialog - but I cannot control the padding
 -->
<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-select
        v-model="selected"
        use-input
        fill-input
        hide-selected
        standout
        inputdebounce="0"
        clearable
        placeholder="Search for a caller"
        :options="options"
        @filter="filterFn"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        @update:model-value="callerSelected"
        hint="Part of name / date of birth (YYYY-MM-DD) / HRN (######)"
      >
        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <q-card v-if="selected" bordered style="max-width: 400px">
      <q-card-section class="bg-primary text-white" horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">{{
              selectedCaller.FirstName
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">{{
              selectedCaller.LastName
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">Phone Number:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.PhoneNumber
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pl-md" horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">Date of birth:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.DateOfBirth
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">HRN:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.LocalHealthID
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pl-md" horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">Hse No.:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.HouseNumber
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">Address:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.ClientAddress
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption">Locality:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.Locality
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="selectedCaller.Notes">
          <q-item-section>
            <q-item-label class="text-caption">Notes:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.Notes
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="selectedCaller.Alert">
          <q-item-section>
            <q-item-label class="text-caption">Alert:</q-item-label>
            <q-item-label class="text-body1">{{
              selectedCaller.Alert
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          label="Edit"
          type="submit"
          class="q-mt-md"
          style="max-width: 400px"
          @click="openDialog('top')"
        />
        <q-btn
          rounded
          color="primary"
          label="New"
          type="reset"
          class="q-mt-md"
          style="max-width: 400px"
          @click="newCaller"
        />
        <q-btn
          flat
          color="primary"
          label="Delete"
          type="reset"
          class="q-mt-md"
          style="max-width: 400px"
        />
        <!-- @click="deleteCaller"  -->
      </q-card-actions></q-card
    >
    <q-dialog v-model="dialog" :position="position">
      <div class="q-pa-md" style="width: 400px">
        <q-form class="q-pl-md" style="max-width: 400px" @submit="submitCaller">
          <q-card>
            <q-input
              outlined
              v-model="selectedCaller.PhoneNumber"
              label="Phone Number"
              type="text"
            />
            <q-input
              outlined
              v-model="selectedCaller.FirstName"
              label="First Name"
              type="text"
            />
            <q-input
              outlined
              v-model="selectedCaller.LastName"
              label="Last Name"
              type="text"
            />
            <q-input
              outlined
              name="dateofbirth"
              v-model="selectedCaller.DateOfBirth"
              label="Date of birth"
              type="date"
              placeholder="dd/mm/yyyy"
            />
            <q-input
              outlined
              v-model="selectedCaller.HouseNumber"
              label="House Number"
              type="text"
            />
            <q-input
              outlined
              v-model="selectedCaller.ClientAddress"
              label="Address"
              type="text"
            />
            <!-- <q-input
              v-model="selectedCaller.Locality"
              label="Locality"
              type="text"
            /> -->
            <q-select
              clearable
              filled
              label="Locality"
              v-model="selectedCaller.LocalityID"
              :options="localityOptions"
              :loading="loading"
              map-options
              @update:model-value="selectedCaller.Locality = $event.label"
            >
              <template v-slot:prepend>
                <q-icon name="place" @click.stop.prevent />
              </template>
            </q-select>

            <q-input
              outlined
              v-model="selectedCaller.Notes"
              label="Notes"
              type="text"
              autogrow
            />
            <q-input
              outlined
              v-model="selectedCaller.Alert"
              label="Alert"
              type="text"
              autogrow
            />
            <!-- <q-input
              v-model="selectedCaller.LocalityID"
              label="Locality ID"
              type="number"
            /> -->
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
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
name: "Caller";
import { ref } from "vue";

export default {
  setup() {
    const dialog = ref(false);
    const position = ref("top");
    return {
      loading: false,
      selected: ref(null),
      clients: ref([]), // this is the array of options (objects.value, .lablel and .key) that will be displayed in the q-select search at the top of the form
      selectedCaller: ref({}), // this is the selected option that will fill in the form
      callers: ref([]), // this is the array of objects returned from the Axios API
      options: ref([]),
      localityOptions: [],
      dialog,
      position,

      openDialog(pos) {
        position.value = pos;
        dialog.value = true;
      },
    };
  },

  methods: {
    //to pull the callers from the API
    load() {
      this.loading = true;
      //use Axios to get the data from the API  - need to use $api here but does not appear to be working
      //console.log(this.$api);
      this.$axios
        .get(`http://localhost:3000/callers`)
        // .get(this.$api(`/callers`)) //this.$api is not working - there is an entry in the boot file axios.js
        .then((response) => {
          //console.log(response),
          this.callers = response.data.data;
          this.clients = this.createClientForSelect(this.callers);
          // this.clients = this.callers.map((item) => ({
          //   label: `${item.FirstName} ${item.LastName}${
          //     item.DateOfBirth ? " - DoB: " : ""
          //   }${item.DateOfBirth ? item.DateOfBirth : ""}${
          //     item.LocalHealthID ? " - HRN: " : ""
          //   }${item.LocalHealthID ? item.LocalHealthID : ""}`,
          //   value: item.id,
          //   key: item.id,
          // }));
        })
        .catch(() => {
          alert("Error loading client details");
        })
        .finally(() => {
          this.loading = false;
        });

      this.$axios
        .get("http://localhost:3000/locales/idandname/")
        .then((response) => {
          this.localityOptions = response.data.data.map((item) => ({
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

    createClientForSelect(callers) {
      return callers.map((item) => ({
        label: `${item.FirstName} ${item.LastName}${
          item.DateOfBirth ? " - DoB: " : ""
        }${item.DateOfBirth ? item.DateOfBirth : ""}${
          item.LocalHealthID ? " - HRN: " : ""
        }${item.LocalHealthID ? item.LocalHealthID : ""}`,
        value: item.id,
        key: item.id,
      }));
    },

    filterFn(val, update) {
      //console.log("filterFn", val);
      if (val === "") {
        update(() => {
          this.options = this.clients;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.clients.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
          // Can we find Anne Moore when the person types "an moo" for example
          //Communicare also finds "Moore Anne" with this string
          //(v) => v.label.toLowerCase().match("/${needle}/") > -1
        );
      });
    },

    async submitCaller() {
      {
        this.loading = true;

        if (this.selectedCaller) {
          //needs validation
          if (this.selectedCaller.id) {
            //update
            console.log("Pre POST", this.selectedCaller);
            await this.$axios
              .post(`http://localhost:3000/callers/id`, this.selectedCaller)
              .then((response) => {
                console.log(response);
                console.log("Post POST", this.selectedCaller);
              });
            //need to update the search item to reflect the changes
          } else {
            //else create a new user
            console.log("Pre POST - create", this.selectedCaller);
            await this.$axios
              .post("http://localhost:3000/callers", this.selectedCaller)
              .then((response) => {
                console.log(response);
                console.log("Post POST - create", this.selectedCaller);
                this.selectedCaller.id = response.data.result.lastInsertedRowid;
                this.callers.push(this.selectedCaller);
                //  ToDo: Need to add the new caller to the clients array so that it appears in the search
                //   this.clients.push(
                //   (this.selectedCaller)=>{
                //     label: `${this.selectedCaller.FirstName} ${this.selectedCaller.LastName}${
                //       this.selectedCaller.DateOfBirth ? " - DoB: " : ""
                //     }${this.selectedCaller.DateOfBirth ? this.selectedCaller.DateOfBirth : ""}${
                //       this.selectedCaller.LocalHealthID ? " - HRN: " : ""
                //     }${this.selectedCaller.LocalHealthID ? this.selectedCaller.LocalHealthID : ""}`,
                //     value: this.selectedCaller.id,
                //     key: this.selectedCaller.id,
                //   } );
              });
          }
        }
        this.loading = false;

        this.dialog = false;
      }
    },

    newCaller() {
      this.selectedCaller = {};
      this.dialog = true;
    },

    callerSelected() {
      try {
        console.log(this.selected);
        this.selectedCaller = this.callers.find(
          (item) => item.id === this.selected.value
        );
        console.log(this.selectedCaller);
      } catch (error) {
        console.log(error); //need to handle this error
      }
    },
  },
  mounted() {
    this.load();
  },
};
</script>
