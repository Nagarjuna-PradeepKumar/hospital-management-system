<template>
  <!-- Searchbar -->
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="4" lg="8" md="10" sm="8" class="ma-5">
        <v-card elevation="5">
        <v-form class="ma-2">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="6" md="6" class="mt-5">
                <v-autocomplete
                  clearable
                  @change="submitsearch"
                  :items="names"
                  outlined
                  dense
                  prepend-icon="mdi-account-circle"
                  v-model="search.patient_name"
                  label="Patient's name"
                  v-on:keypress.enter="submitsearch"
                />
              </v-col>
              <v-col cols="9" sm="5" md="5" class="mt-5">
                <v-autocomplete
                  clearable
                  @change="submitsearch"
                  outlined
                  dense
                  :items="phone"
                  prepend-icon="mdi-phone-in-talk"
                  v-model="search.patient_phoneno"
                  label="Phone number"
                  v-on:keypress.enter="submitsearch"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        </v-card>
      </v-col>
    </v-row>
    <!-- Results view -->
    <v-row id="resultpane" justify="center">
      <v-col cols="12" xl="4" lg="8" md="10" sm="8" class="ma-5">
        <edit-patinet v-bind:fetch="fetched" v-on:clearfetch="resetfetch" />
      </v-col>
    </v-row>
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import addeditpatientform from "./addeditpatientform.vue";
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "addeditpatientform",
  components: {
    "edit-patinet": addeditpatientform,
    "dialog-box": dialogbox
  },
  data: () => ({
    search: { patient_name: undefined, patient_phoneno: undefined },
    fetched: [],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    }
  }),
  methods: {
    submitsearch: function() {
      this.$axios
        .post("/patient/getdata", this.search)
        .then(Response => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
            console.log(this.fetched);
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetfetch: function() {
      this.$axios
        .post("/patient/getdata", this.search)
        .then(Response => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
            console.log(this.fetched);
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    phone() {
      return [...new Set(this.fetched.map((x) => x.patient_phoneno))];
    },
    names() {
      return [...new Set(this.fetched.map((x) => x.patient_name))];
    },
  },
  created(){
        this.$axios
        .post("/patient/getdata", this.search)
        .then(Response => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
            console.log(this.fetched);
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>
