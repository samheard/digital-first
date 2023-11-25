<template>
  <!-- Issues with Dispense page
   2. The filter works now - has to be quite complicated to work with all the changes to the columns as these are not filtered in the default way
  3. Dispensed date does not show and not sure that it is needed.

Possible developments - put all the reuseable items in a separate tab - and show if any of these items are still open with a warning sign.
This might simplify the interactions and coding
-->

  <q-page padding>
    <div class="q-pa-md">
      <!-- <keep-alive> -->
      <q-table
        flat
        bordered
        title="Lockers"
        :rows="rows"
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
                  v-if="props.row.Status === 'reuse'"
                  color="primary"
                  float
                  rounded
                  >reuse</q-badge
                >
                <q-badge
                  v-else-if="
                    new Date().getTime() >
                    new Date(props.row.ExpiresOn).getTime()
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
                    2500000000
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
              <q-badge v-if="props.row.Available === 1" color="green">
                Y<!-- {{ props.row.Available }} -->
              </q-badge>
              <q-badge v-else color="red">
                N<!-- {{ props.row.Available }} -->
              </q-badge>
            </q-td>
            <q-td key="Open" :props="props">
              <q-btn
                v-if="props.row.Available === 1"
                color="primary"
                label="Open"
                style="max-width: 65px"
                @click="openLocker(props.row)"
              />
              <q-btn
                v-else-if="
                  (props.row.Available === 0) & (props.row.Status === 'reuse')
                "
                color="red-9"
                text-color="black"
                label="Close"
                style="max-width: 65px"
                @click="closeLocker(props.row)"
              />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top-right>
          <!-- this is the search box -->
          <q-input
            bordered
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            clearable
            style="max-width: 200px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar"; //allows use of the dialog plug in

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
//     status: "dispense",
//     available: "Y",
//     date_dispensed: "",
//     open: "",
//   },

export default {
  name: "DispensePage",
  setup() {
    const q = useQuasar(); //allows use of the dialog plug in
    const rows = ref([]);

    return {
      filter: ref(""), //this is the search box
      columns,
      rows,
      buttonLabel: "Open",
      tableKey: ref(0), //this key enables a refresh of the table - without this, the screen is not altered by the code
      q,
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
      var messageString;
      if (row.status === "dispense") {
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
      this.q
        .dialog({
          title: "Please Confirm",
          message:
            //"Are you sure you want to open this locker ${ row.status } ?",
            messageString,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          row.Available = 0;
          if (row.Status === "dispense") {
            row.DateDispensed = new Date().toISOString().slice(0, 16);
          }
          row.Open = 1; //this allows the person maintaining the dispensing lockers to know this reuseable item has been used.
          //keep-alive tag solved this problem - this.tableKey += 1; //this key enables a refresh of the table - without this, the screen is not altered by the code
        });
    },

    closeLocker(row) {
      row.Available = 1;
      //keep-alive tag solved this problem - this.tableKey += 1; //this key enables a refresh of the table - without this, the screen is not altered by the code
    },

    // onUpdate() {
    //   console.log("updated");
    // },

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
  },
  mounted() {
    this.load();
  },
};
</script>
