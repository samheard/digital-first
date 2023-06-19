<!-- Edit Caller details or add new Caller
option to deal with caller immediately of add to Waitlist-->

<!-- Edit Selected Caller -->
<template>
  <div class="edit-caller">
    <h1>Edit Caller</h1>
    <div class="caller-details">
      <div class="caller-details__name">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="caller.name" />
      </div>
      <div class="caller-details__phone">
        <label for="phone">Phone</label>
        <input type="text" id="phone" v-model="caller.phone" />
      </div>
      <div class="caller-details__email">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="caller.email" />
      </div>
      <div class="caller-details__notes">
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="caller.notes"></textarea>
      </div>
    </div>
    <div class="caller-actions">
      <button @click="saveCaller">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>

  <!-- Add new Caller -->

    <div class="add-caller">
        <h1>Add Caller</h1>
        <div class="caller-details">
        <div class="caller-details__name">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="caller.name" />
        </div>
        <div class="caller-details__phone">
            <label for="phone">Phone</label>
            <input type="text" id="phone" v-model="caller.phone" />
        </div>
        <div class="caller-details__email">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="caller.email" />
        </div>
        <div class="caller-details__notes">
            <label for="notes">Notes</label>
            <textarea id="notes" v-model="caller.notes"></textarea>
        </div>
        </div>
        <div class="caller-actions">
        <button @click="saveCaller">Save</button>
        <button @click="cancelEdit">Cancel</button>
        </div>

        <!-- Add to Waitlist -->

        <div class="add-waitlist">
        <h1>Add to Waitlist</h1>
        <div class="caller-details">
        <div class="caller-details__name">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="caller.name" />
        </div>
        <div class="caller-details__phone">
            <label for="phone">Phone</label>
            <input type="text" id="phone" v-model="caller.phone" />
        </div>
        <div class="caller-details__email">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="caller.email" />
        </div>
        <div class="caller-details__notes">
            <label for="notes">Notes</label>
            <textarea id="notes" v-model="caller.notes"></textarea>
        </div>
        <div class="caller-actions">
        <button @click="saveCaller">Save</button>
        <button @click="cancelEdit">Cancel</button>
        </div>
        