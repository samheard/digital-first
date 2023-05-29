<template>
  <!-- Issues with Dispense page
  1. The table is not responsive and does not refresh when you push the open button - tried ref="lockerTable" and
  this.$refs.lockerTable.refresh() but it does not work. The other solution to make a key for the table and change that onUpdate does not do the trick either
  2. The filter works now - has to be quite complicated to work with all the changes to the columns as these are not filtered in the default way
  3. Dispensed date does not show and not sure that it is needed.

Possible developments - put all the reuseable items in a separate tab - and show if any of these items are still open with a warning sign.
This might simplify the interactions and coding
-->

  <q-page padding>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        hide-header
        title="Lockers"
        :rows="rows"
        :columns="columns"
        row-key="lockerNumber"
        :filter="filter"
        :filter-method="customFilter"
        :rows-per-page-options="[10, 20, 0]"
        :key="tableKey"
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="
              props.row.status == 'reuse'
                ? 'bg-yellow text-black'
                : 'bg-white text-black'
            "
          >
            <q-td key="lockerNumber" :props="props">
              <q-badge color="primary" outline>
                {{ props.row.lockerNumber }}
              </q-badge>
            </q-td>
            <q-td key="content" :props="props">
              <div class="text-h6">
                {{ props.row.content }}
                <q-badge
                  v-if="props.row.status === 'reuse'"
                  color="primary"
                  float
                  rounded
                  >reuse</q-badge
                >
              </div>
            </q-td>
            <q-td key="available" :props="props">
              <q-badge v-if="props.row.available === 'Y'" color="green">
                {{ props.row.available }}
              </q-badge>
              <q-badge v-else color="red">
                {{ props.row.available }}
              </q-badge>
            </q-td>
            <q-td key="open" :props="props">
              <q-btn
                v-if="props.row.available === 'Y'"
                color="primary"
                label="Open"
                style="max-width: 65px"
                @click="openLocker(props.row)"
              />
              <q-btn
                v-else-if="
                  (props.row.available === 'N') & (props.row.status === 'reuse')
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

const columns = [
  {
    name: "lockerNumber",
    required: true,
    label: "Locker Number",
    align: "center",
    sortable: true,
  },
  {
    name: "content",
    align: "left",
    label: "Content",
    sortable: true,
    classes: "text-bold",
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
  },
  {
    name: "available",
    align: "center",
    label: "Available",
    field: "available",
  },
  { name: "date_dispensed", label: "Dispensed", field: "date_dispensed" },
  { name: "open", label: "Open", field: "open" },
];

const rows = [
  {
    lockerNumber: "1",
    content: "Paracetamol 500mg tabs x 20",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "2",
    content: "Paracetamol 250mg/5mls x 100mls",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "3",
    content: "Amoxycillin 500mg tabs x 20",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "4",
    content: "Ibuprofen 200mg tabs x 20",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "5",
    content: "Naproxen 1000mg m/r tabs x 7",
    status: "dispense",
    available: "N",
    date_dispensed: "202-05-04:11.03",
    open: "",
  },
  {
    lockerNumber: "6",
    content: "Mefix 10cm x 10m x 2",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "7",
    content: "Pulse oximeter",
    status: "reuse",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "8",
    content: "Lyclear Dermal Cream 30g",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "9",
    content: "hydrocortisone 1% cream 15g",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "10",
    content: "Chloramphenicol 0.5% eye drops 10mls",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "11",
    content: "Mefix 15cm x 10m x 2",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "12",
    content: "Salbutamol 100mcg inhaler x 2",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "13",
    content: "Flixotide 250mcg inhaler x 1",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "14",
    content: "Flixotide 125mg inhaler x 1",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "15",
    content: "Spacer for inhalation x 1",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "16",
    content: "Furosemide 40mg tabs x 28",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: "17",
    content: "Thermometer",
    status: "reuse",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
  {
    lockerNumber: 18,
    content: "Spironolactone 25mg x 20",
    status: "dispense",
    available: "Y",
    date_dispensed: "",
    open: "",
  },
];

export default {
  name: "DispensePage",
  setup() {
    return {
      filter: ref(""), //this is the search box
      columns,
      rows,
      tableKey: 0,
      buttonLabel: "Open",
    };
  },

  methods: {
    openLocker(row) {
      console.log(row);
      row.available = "N";
      if (row.status === "dispense") {
        row.date_dispensed = new Date().toISOString().slice(0, 16);
      }
      row.open = "Y"; //this allows the person maintaining the dispensing lockers to know this reuseable item has been used.
      this.onUpdate();
    },

    closeLocker(row) {
      row.available = "Y";
      this.onUpdate();
    },

    onUpdate() {
      console.log("updated");

      this.tableKey += 1;
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
      if (col.name === "content") {
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
};
</script>
