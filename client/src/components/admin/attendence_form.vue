<template>
  <v-container fluid class="pt-0 mt-0">
    <v-data-table
      :headers="headers"
      :items="fetch"
      sort-by
      :search="search"
      class="elevation-1"
      v-if="fetched.length>=0"
    >
      <template v-slot:top>
        <v-container>
          <v-row justify="space-around" class="pa-2" dense>
            <v-col cols="12" sm="4" align-self="center">
              <v-toolbar-title>Attendence register</v-toolbar-title>
            </v-col>
            <v-col cols="12" sm="8" align-self="center">
              <v-row justify="center">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-filter"
                  label="Filter"
                  single-line
                  hide-details
                  class="pb-5"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="checkpresent(item)" color="green">mdi-check-all</v-icon>
        <v-icon v-if="!checkpresent(item)" color="red">mdi-close-outline</v-icon>
      </template>
      <template v-slot:item.changepassword="{ item }">
        <v-btn
          x-small
          dense
          v-if="checkpresent(item)"
          color="red"
          v-on:click="markabsent(item)"
        >mark absent</v-btn>
        <v-btn
          x-small
          dense
          v-if="!checkpresent(item)"
          color="green"
          v-on:click="markpresent(item)"
        >mark present</v-btn>
      </template>
    </v-data-table>
    <!-- Add user form -->
    <!-- Close only dialog box -->
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>


<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  components: {
    "dialog-box": dialogbox
  },
  props: { fetch: { type: Array }, selecteddate: { type: String } },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "user_name"
      },
      { text: "Role", value: "user_role" },
      { text: "Phone", value: "phoneno" },
      { text: "Availability", value: "actions", sortable: false },
      { text: "Action", value: "changepassword", sortable: false }
    ],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    }
  }),

  computed: {
    fetched() {
      return this.fetch;
    },
    date() {
      return this.selecteddate;
    }
  },

  methods: {
    checkpresent: function(item) {
      if (item.attendence.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    markpresent: async function(item) {
      console.log(item.user_id, this.date);
      this.$axios
        .post("/attendence/markpresent", {
          user_id: item.user_id,
          date: this.date
        })
        .then(Response => {
          if (Response.data.success) {
            this.$emit("clearfetch");
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
            console.log("error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    markabsent: async function(item) {
      console.log(item.user_id);
      this.$axios
        .post("/attendence/removepresent", {
          user_id: item.user_id,
          date: this.date
        })
        .then(Response => {
          if (Response.data.success) {
            this.$emit("clearfetch");
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
            console.log("error");
          }
        });
    }
  }
};
</script>