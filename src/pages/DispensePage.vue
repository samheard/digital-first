<template>
  <!-- Issues with Dispense page

Possible developments - put all the reuseable items in a separate tab - and show if any of these items are still open with a warning sign.
This might simplify the interactions and coding
-->

  <q-page>
    <div class="q-pa-md">
      <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
        <q-toolbar-title>Lockers</q-toolbar-title>
        <q-space />
        <q-separator dark vertical inset />
        <q-toggle
          v-model="refill"
          label="Enable Refills"
          color="yellow"
          class="q-mr-sm"
        />
        <q-separator dark vertical inset />
        <q-space />
        <q-toggle
          v-if="refill"
          v-model="showEmpty"
          color="yellow"
          label="Show Empty Lockers"
        />
        <q-space v-if="refill" />
        <q-separator v-if="refill" dark vertical inset />
        <q-space />
        <q-select
          v-model="categoryChoice"
          class="q-mr-sm"
          :options="[
            { label: 'All', value: 0 },
            { label: 'Medication', value: 1 },
            { label: 'Supplies', value: 2 },
            { label: 'Device', value: 3 },
          ]"
          label="Show Category"
          emit-value
          map-options
          style="min-width: 150px"
        />
        <q-separator dark vertical inset />

        <q-input
          bordered
          dense
          bg-color="white"
          debounce="300"
          v-model="filter"
          placeholder="Search"
          clearable
          style="max-width: 200px"
          class="q-mr-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <!-- <keep-alive> not required as data updated in save to Express functions -->
      <q-table
        flat
        bordered
        :rows="filteredRows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :filter-method="customFilter"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Content" :props="props">
              <div class="text-h6">
                {{ props.row.Content }}
                <q-badge
                  v-if="props.row.Category == 3"
                  color="primary"
                  float
                  rounded
                  >Device</q-badge
                >
                <q-badge
                  v-if="props.row.Category == 2"
                  color="secondary"
                  float
                  rounded
                  >Supplies</q-badge
                >
                <q-badge
                  v-else-if="
                    new Date().getTime() >
                      new Date(props.row.ExpiresOn).getTime() &&
                    props.row.Available === 'Y' &&
                    props.row.Category == 1
                  "
                  color="red"
                  float
                  rounded
                  >Expired on the {{ props.row.ExpiresOn }}</q-badge
                >
                <q-badge
                  v-else-if="
                    new Date(props.row.ExpiresOn).getTime() -
                      new Date().getTime() <
                      2500000000 && // Expires in less than 30 days
                    props.row.Available === 'Y' &&
                    props.row.Category == 1
                  "
                  color="orange"
                  float
                  rounded
                  >Expires on {{ props.row.ExpiresOn }}</q-badge
                >
              </div>
            </q-td>

            <q-td key="LockerNumber" :props="props">
              <q-badge color="primary" outline>
                {{ props.row.LockerNumber }}
              </q-badge>
            </q-td>

            <q-td key="Available" :props="props">
              <q-badge v-if="props.row.Available === 'Y'" color="green">
                Y<!-- {{ props.row.Available }} -->
              </q-badge>
              <q-badge v-else color="red">
                N<!-- {{ props.row.Available }} -->
              </q-badge>
            </q-td>
            <q-td key="Open" :props="props">
              <q-btn
                v-if="(props.row.Available === 'N') & refill"
                color="yellow"
                text-color="black"
                style="max-width: 60px"
                label="Refill"
                @click="refillLocker(props.row)"
              />
              <q-btn
                v-else-if="
                  props.row.Available === 'Y' && props.row.Open === 'N'
                "
                color="primary"
                label="Open"
                style="max-width: 65px"
                @click="openLocker(props.row)"
              />
              <q-btn
                v-else-if="
                  (props.row.Open === 'Y') &
                    (props.row.Available === 'N') &
                    !refill ||
                  (props.row.Open === 'Y') & (props.row.Available === 'Y')
                "
                color="red-9"
                text-color="black"
                label="Confirm Closed"
                style="max-width: 125px"
                @click="closeLocker(props.row)"
              />
              <q-btn
                v-else-if="
                  (props.row.Available === 'N') &
                  ((props.row.Open === 'N') & !refill)
                "
                outline
                style="color: red-9; max-width: 60px"
                label="Refill"
              />
              <!-- q-icon name="sensor_door" added and respond to the IOT environment and switching -->
            </q-td>
          </q-tr>
          <LockerRefillDialog v-model="dialogVisible" :props="props.row" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar"; //allows use of the dialog plug in
import LockerRefillDialog from "../components/LockerRefillDialog.vue";
import { isPropertySignature } from "typescript";

const columns = [
  {
    name: "Content",
    align: "left",
    label: "Content",
    sortable: true,
    classes: "text-bold",
    field: "Content",
  },
  {
    name: "LockerNumber",
    required: true,
    label: "Locker Number",
    align: "center",
    field: "LockerNumber",
    sortable: true,
  },

  {
    name: "Available",
    align: "center",
    label: "Available",
    field: "Available",
    sortable: true,
  },
  {
    name: "Open",
    align: "center",
    label: "Action",
  },
];

const rows = [];

// const rows = [ example
//   {
//     lockerNumber: "1",
//     content: "Paracetamol 500mg tabs x 20",
//     Category: 1, //"Medication",
//     available: "Y",
//     date_dispensed: "",
//     open: "",
//   },

export default {
  name: "DispensePage",
  setup() {
    const qsr = useQuasar(); //allows use of the dialog plug in
    const rows = ref([]);

    return {
      filter: ref(""), //this is the search box
      columns,
      rows, //original data
      //filteredRows: [{ rows }], //filtered according to the drop down select to the value in the Category Columm (rows.Category) Medication = 1, Supplies = 2, Device = 3;
      buttonLabel: "Open",
      tableKey: ref(0), //this key enables a refresh of the table - without this, the screen is not altered by the code
      qsr,
      dialogVisible: ref(false),
      refill: ref(false),
      showEmpty: ref(false),
      categoryChoice: ref(0),
    };
  },

  methods: {
    load() {
      this.loading = true;
      //use Axios to get the data from the API  - need to use $api here but does not appear to be working
      //console.log(this.$api);
      this.$axios
        .get(`http://localhost:3000/dispense`)
        // .get(this.$api(`/dispense`)) //this.$api is not working - there is an entry in the boot file axios.js
        .then((response) => {
          console.log(response.data);
          this.rows = response.data.data;
        })
        .catch(() => {
          alert("Error loading dispensing details");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    openLocker(row) {
      const originalRow = { ...row }; //shallow copy

      let messageString;
      if (row.Category != 3) {
        //not a resuable device
        messageString =
          "Are you sure you want to open this locker to dispense " +
          row.Content +
          "?";
      } else {
        messageString =
          "Are you sure you want to open this locker to use the " +
          row.Content +
          "?";
      }
      this.qsr
        .dialog({
          title: "Please Confirm",
          message:
            //"Are you sure you want to open this locker?",
            messageString,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          const newRow = { row };
          newRow.Available = "N";

          if (newRow.row.Category != 3) {
            let dispDate = new Date();
            const options = {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            };
            newRow.DateDispensed = dispDate.toLocaleString("en-GB", options);
            //nst time24 = dispDate.toLocaleString("en-GB", options);
            //let index = time24.indexOf(":") + 3; // date and time only to minutes
            //newRow.DateDispensed = time24.slice(0, index);
          }
          newRow.Open = "Y"; //this allows the person maintaining the dispensing lockers to know this reuseable item has been used.
          //need to async and capture error - reverse changes in the current row
          // console.log(
          //   "Timezone: ",
          //   Intl.DateTimeFormat().resolvedOptions().timeZone
          // );
          console.log("Pre POST new: ", newRow);
          console.log("Pre POST original: ", row);
          // console.log("Checking this: ", this);
          this.submitDispense(newRow);
        });
    },

    closeLocker(row) {
      const newRow = { ...row };
      newRow.Open = "N";
      if (row.Category == 3) {
        newRow.Available = "Y";
      }
      this.submitDispense(newRow);
    },

    refillLocker(row) {
      if (this.refill) {
        this.qsr
          .dialog({
            component: LockerRefillDialog,
            title: "Please fill in the details",
            componentProps: {
              selectedRow: row,
            },

            cancel: true,
            persistent: true,
          })
          .onOk((rowChanges) => {
            //Locker has been refilled
            // console.log(JSON.stringify(rowChanges));
            console.log("Dialog return 1: ", rowChanges);
            const newRow = { row };
            newRow.Available = "Y";
            newRow.Open = "Y";
            newRow.DateDispensed = null;
            console.log(
              "Dialog return 2: ",
              rowChanges.content,
              rowChanges.expiryDate,
              rowChanges.category
            );
            if (rowChanges.content && rowChanges.content !== "") {
              newRow.Content = rowChanges.content;
            }
            if (rowChanges.expiryDate) {
              newRow.ExpiresOn = rowChanges.expiryDate.replace(/\//g, "-");
            }
            if (rowChanges.category) {
              newRow.Category = rowChanges.category;
            }
            this.submitDispense(newRow);
          });
      }
    },

    customFilter(rows, search, cols) {
      search = String(search).toLowerCase();
      return rows.filter((row) => {
        return cols.some((col) => {
          return this.getFilterValue(row, col, search);
        });
      });
    },

    getFilterValue(row, col, search) {
      if (col.name === "Content") {
        return (
          String(this.getCellValue(row, col)).toLowerCase().indexOf(search) > -1
        );
      }
      return false;
    },

    getCellValue(row, col) {
      console.log(row[col.name]);
      return row[col.name];
    },

    async submitDispense(updatedRow) {
      this.loading = true;
      let success = false;
      console.log("Pre POST 1 in submitDispense: ", updatedRow.Category);

      if (updatedRow) {
        //needs validation
        if (updatedRow.row.id) {
          //update
          console.log("Pre POST 2 in submitDispense: ", updatedRow);
          await this.$axios
            .post(`http://localhost:3000/dispense/id`, updatedRow)
            .then((response) => {
              if (response.status === 200) {
                console.log("Success");
                success = true;
              }
              console.log(response);
              console.log("Post POST", updatedRow);
              console.log("Post POST", response.data);
            })
            .catch((error) => {
              console.log(error);
              if (error.response) {
                if (error.response.status === 400) {
                  alert(
                    "Error updating dispensing details - please check the data"
                  );
                } else {
                  alert("Error updating dispensing details");
                }
              } else if (error.request) {
                alert(
                  "Error updating dispensing details - no response from server"
                );
              } else {
                alert(
                  "Error updating dispensing details - unknown network error"
                );
              }
            });

          if (success) {
            //no need to reverse changes but if it is successful, need to update the table
            if (updatedRow) {
              console.log("Updating row");
              for (var key in updatedRow) {
                if (updatedRow.row.hasOwnProperty(key)) {
                  updatedRow.row[key] = updatedRow[key];
                }
              }
            }
          }
        }
      }

      this.loading = false;
    },
  },

  computed: {
    filteredRows() {
      if (this.categoryChoice === 0) {
        if (this.showEmpty & this.refill) {
          // Show all rows including empty lockers
          return this.rows;
        } else {
          // Show all filled rows
          return this.rows.filter((row) => row.Content != "Empty");
        }
      } else {
        return this.rows.filter((row) => row.Category === this.categoryChoice);
      }
    },
  },

  mounted() {
    //this must be outside the setup function
    this.load();
  },
};
</script>
