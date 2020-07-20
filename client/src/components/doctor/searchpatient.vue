<template>
<div>
    <v-data-table :headers="headers" :items="fetch" sort-by :search="search" class="elevation-1" dark>
      <template v-slot:top>
        <v-toolbar flat dark="">
          <v-toolbar-title>Patients</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-filter"
            label="Filter"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon large class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
      </template>
    </v-data-table>
    <!-- Add new patient dialog -->
    <!-- Dialog for editing the patient data -->
    <v-dialog v-model="editdialog" max-width="600px" dark="">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Patient's data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  v-model="singleform.patient_name"
                  label="Patient name"
                  readonly
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  prepend-icon="mdi-numeric"
                  v-model="singleform.patient_age"
                  label="Patient age"
                  readonly
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  prepend-icon="mdi-gender-male-female-variant"
                  v-model="singleform.patient_gender"
                  label="Gender"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-text-field
                  prepend-icon="mdi-home-circle"
                  v-model="singleform.patient_address"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field prepend-icon="mdi-email" v-model="singleform.patient_email" readonly />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-phone-in-talk"
                  v-model="singleform.patient_phoneno"
                  label="Phone number"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="4">
                <v-text-field
                  prepend-icon="mdi-briefcase"
                  v-model="singleform.patient_occupation"
                  label="Occupation"
                  readonly
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-water"
                  v-model="singleform.patient_blood_group"
                  label="Blood group"
                  readonly
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-human"
                  v-model="singleform.patient_maritalstatus"
                  label="Marital status"
                  readonly
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editdialog=false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="editdialog=false">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog  -->
    <!-- Close only dialog box -->
    <dialog-box v-bind:dialogmessage="dialogdata" />
    </div>
</template>


<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  components: {
    "dialog-box": dialogbox
  },
  props:["showsearch"],
  data: () => ({
    search: "",
    editdialog: false,
    fetch: [],
    headers: [
      { text: "Name", sortable: true, value: "patient_name" },
      { text: "Age", value: "patient_age" },
      { text: "Phone", value: "patient_phoneno" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    singleform: {
      patient_id: "",
      patient_name: "",
      patient_age: "",
      patient_gender: "",
      patient_occupation: "",
      patient_address: "",
      patient_maritalstatus: "",
      patient_blood_group: "",
      patient_phoneno: "",
      patient_email: ""
    },
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    },
    gender: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
      { text: "Others", value: "others" }
    ]
  }),
  created() {
    this.$axios
      .post("/patient/getdata",{ patient_name: undefined, patient_phoneno: undefined })
      .then(Response => {
        if (Response.data.success) {
            console.log("success")
          this.fetch = Response.data.success;
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
  methods: {
    editItem: function(item) {
      this.singleform.patient_id = item._id;
      (this.singleform.patient_name = item.patient_name),
        (this.singleform.patient_age = item.patient_age),
        (this.singleform.patient_gender = item.patient_gender),
        (this.singleform.patient_occupation = item.patient_occupation),
        (this.singleform.patient_address = item.patient_address),
        (this.singleform.patient_maritalstatus = item.patient_maritalstatus),
        (this.singleform.patient_blood_group = item.patient_blood_group),
        (this.singleform.patient_phoneno = item.patient_phoneno),
        (this.singleform.patient_email = item.patient_email),
        (this.editdialog = true);
    },
    submitedit: function() {
      this.$axios
        .post("/patient/changedata", this.singleform)
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Edited " + this.singleform.patient_name + "'s data";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
            this.$emit("clearfetch");
            for (var key in this.singleform) {
              this.singleform[key] = "";
            }
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
          this.dialogdata.title = "Error";
          this.dialogdata.message = err;
          this.dialogdata.buttontext = "Ok";
          this.dialogdata.type = "warning";
          this.dialogdata.show = true;
        });
    }
  }
};
</script>