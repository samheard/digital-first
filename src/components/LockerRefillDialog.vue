<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 400px">
      <q-card-section>
        <q-input
          v-model="rowLockerNumber"
          readonly
          label="Locker Number"
          type="text"
        />
        <q-input v-model="rowContent" label="Locker Content" type="text" />
        <q-select
          v-model="rowCategory"
          :options="[
            { label: 'Medication', value: 1 },
            { label: 'Dressings/Supplies', value: 2 },
            { label: 'Device for reuse', value: 3 },
          ]"
          label="Type of content"
          emit-value
          map-options
        />
        <q-input
          filled
          v-if="rowCategory === 1"
          v-model="rowExpiryDate"
          mask="date"
          label="Expiry Date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="rowExpiryDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";

export default {
  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const rowCategory = ref(props.selectedRow.Category);
    const rowContent = ref(props.selectedRow.Content);
    const rowExpiryDate = ref(props.selectedRow.ExpiresOn);

    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      rowContent,
      rowExpiryDate,
      rowCategory,
      rowLockerNumber: props.selectedRow.LockerNumber,
    };
  },

  methods: {
    onOKClick() {
      console.log(
        "Changes: ",
        this.rowContent,
        this.rowExpiryDate,
        this.rowCategory
      );
      this.onDialogOK({
        content: this.rowContent, //Caputured by row changes in calling page.
        expiryDate: this.rowExpiryDate,
        category: this.rowCategory,
      });
    },

    onCancelClick() {
      this.onDialogCancel();
    },
  },
};
</script>
