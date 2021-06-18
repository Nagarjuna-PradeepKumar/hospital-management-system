<template>
  <v-container>
    <v-data-table :headers="headers" :items="fetched" sort-by :search="search" class="elevation-1">
      <template v-slot:top>
        <v-container class="pa-0">
          <v-row justify="space-around" class="pa-2" dense>
            <v-col cols="12" sm="3" align-self="center">
              <h3>Patients</h3>
            </v-col>
            <v-col cols="12" sm="6" align-self="center">
              <v-text-field
                v-model="search"
                append-icon="mdi-filter"
                label="Filter"
                single-line
                hide-details
                class="pb-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" align-self="center">
              <v-row justify="center">
                <v-btn small class="ml-2 primary" @click="addnewpatientdialog=true">
                  <v-icon color="white">mdi-plus-circle</v-icon>Add new
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon large class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
      </template>
      <template v-slot:item.changepassword="{ item }">
        <v-icon large class="mr-2" @click="tokenGenerate(item)">mdi-hospital-box</v-icon>
      </template>
    </v-data-table>
    <!-- Add new patient dialog -->
    <v-dialog v-model="addnewpatientdialog" max-width="650px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Add new patient's data</span>
        </v-card-title>
        <v-card-text>
          <v-form style="border-radius:5px" ref="addnewform">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-account-circle"
                    v-model="send.patient_name"
                    label="Patient name"
                    :rules="[v => !!v || 'Name is required']"
                  />
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-numeric"
                    v-model="send.patient_age"
                    label="Age"
                    :rules="[v => !!v || 'Age is required']"
                  />
                </v-col>
                <v-col cols="6" sm="3">
                  <v-autocomplete
                    dense
                    outlined
                    prepend-icon="mdi-gender-male-female-variant"
                    v-model="send.patient_gender"
                    item-text="text"
                    item-value="value"
                    :items="gender"
                    label="Gender"
                    :rules="[v => !!v || 'Gender is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-home-circle"
                    v-model="send.patient_address"
                    label="User address"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-email"
                    v-model="send.patient_email"
                    label="Email-Id"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-phone-in-talk"
                    v-model="send.patient_phoneno"
                    label="Phone number"
                    :rules="[v => !!v || 'Phone number is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="4">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-briefcase"
                    v-model="send.patient_occupation"
                    label="Occupation"
                  />
                </v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-water"
                    v-model="send.patient_blood_group"
                    label="Blood group"
                  />
                </v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-human"
                    v-model="send.patient_maritalstatus"
                    label="Marital status"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="addnewpatientdialog=false;$refs.addnewform.resetValidation();$refs.addnewform.reset()"
          >Cancel</v-btn>
          <v-btn color="primary darken-1" @click="submitaddnewuserform">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for editing the patient data -->
    <v-dialog v-model="editdialog" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
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
                  :rules="[v => !!v || 'Name is required']"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  prepend-icon="mdi-numeric"
                  v-model="singleform.patient_age"
                  label="Patient age"
                  :rules="[v => !!v || 'Age is required']"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-select
                  prepend-icon="mdi-gender-male-female-variant"
                  v-model="singleform.patient_gender"
                  item-text="text"
                  item-value="value"
                  :items="gender"
                  label="Gender"
                  :rules="[v => !!v || 'Gender is required']"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-text-field
                  prepend-icon="mdi-home-circle"
                  v-model="singleform.patient_address"
                  label="User address"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="singleform.patient_email"
                  label="Email-Id"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-phone-in-talk"
                  v-model="singleform.patient_phoneno"
                  label="Phone number"
                  :rules="[v => !!v || 'Phone number is required']"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="4">
                <v-text-field
                  prepend-icon="mdi-briefcase"
                  v-model="singleform.patient_occupation"
                  label="Occupation"
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-water"
                  v-model="singleform.patient_blood_group"
                  label="Blood group"
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-human"
                  v-model="singleform.patient_maritalstatus"
                  label="Marital status"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary darken-1" @click="editdialog=false">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="editdialog=false;confirmedit=true">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog  -->

    <!-- Generate token Dialogbox -->
    <v-dialog v-model="tokendialog" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Generate token for {{singleform.patient_name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    prepend-icon="mdi-account-circle"
                    v-model="singleform.patient_name"
                    label="Patient name"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    prepend-icon="mdi-doctor"
                    v-model="visiting_doctor"
                    item-text="text"
                    item-value="value"
                    :items="doctors"
                    label="Doctor"
                    :rules="[v => !!v || 'Select visiting doctor']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    prepend-icon="mdi-clipboard-pulse"
                    v-model="complaint"
                    label="Complaint"
                    :rules="[v => !!v || 'Complaint is required']"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="tokendialog=false;$refs.form.resetValidation()"
          >Cancel</v-btn>
          <v-btn color="primary darken-1" @click="tokendialog=false" v-on:click="submitToken">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Confirm change Patient data -->
    <v-dialog v-model="confirmedit" max-width="600px">
      <v-card>
        <v-card-title class="headline warning">
          <span>Do you really want to change data?</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <strong>Do not change data without the concern of the respective person</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="confirmedit=false">Cancel</v-btn>
          <v-btn color="primary darken-1" v-on:click="confirmedit=false" @click="submitedit">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Delete dialogbox -->
    <v-dialog v-model="deletedialog" max-width="600px"></v-dialog>
    <!-- Confirm Delete data -->
    <v-dialog v-model="confirmdelete" max-width="600px"></v-dialog>
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
  props: { fetch: { type: Array } },
  data: () => ({
    search: "",
    addnewpatientdialog: false,
    editdialog: false,
    deletedialog: false,
    tokendialog: false,
    confirmedit: false,
    confirmdelete: false,
    confirmchangepass: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "patient_name"
      },
      { text: "Age", value: "patient_age" },
      { text: "Phone", value: "patient_phoneno" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "Token", value: "changepassword", sortable: false }
    ],
    send: {
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
    ],
    doctors: [],
    complaint: "",
    visiting_doctor: ""
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.$axios.post("/user/getdoctor", this.singleform).then(Response => {
      console.log(Response.data);
      if (Response.data.success) {
        Response.data.success.map(x => {
          this.doctors.push({ text: x.user_name, value: x.user_name });
        });
      } else {
        this.dialogdata.title = "Error";
        this.dialogdata.message = "No doctors found in database";
        this.dialogdata.buttontext = "Ok";
        this.dialogdata.type = "warning";
        this.dialogdata.show = true;
      }
    });
  },

  computed: {
    fetched() {
      return this.fetch;
    }
  },

  methods: {
    editItem: function(item) {
      console.log(item);
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
    deleteItem: function() {},
    tokenGenerate: function(item) {
      this.tokendialog = true;
      this.singleform.patient_id = item._id;
      this.singleform.patient_name = item.patient_name;
      this.singleform.patient_age = item.patient_age;
      this.singleform.patient_gender = item.patient_gender;
      this.singleform.patient_occupation = item.patient_occupation;
      this.singleform.patient_address = item.patient_address;
      this.singleform.patient_maritalstatus = item.patient_maritalstatus;
      this.singleform.patient_blood_group = item.patient_blood_group;
      this.singleform.patient_phoneno = item.patient_phoneno;
      this.singleform.patient_email = item.patient_email;
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
    },
    submitToken: function() {
      console.log("asdasd");
      this.$axios
        .post("/patient/que/add", {
          patient_id: this.singleform.patient_id,
          patient_name: this.singleform.patient_name,
          visiting_doctor: this.visiting_doctor,
          complaint: this.complaint
        })
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message = Response.data.success;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        });
    },
    submitaddnewuserform: function() {
      if (this.$refs.addnewform.validate()) {
        this.$axios
          .post("/patient/create", this.send)
          .then(Response => {
            if (Response.data.success) {
              this.addnewpatientdialog = false;
              this.dialogdata.title = "Success";
              this.dialogdata.message =
                "Created new user " + this.send.patient_name;
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "success";
              this.dialogdata.show = true;
              for (var key in this.send) {
                this.send[key] = "";
              }
              this.$refs.addnewform.resetValidation();
              this.$emit("clearfetch");
            }
            if (Response.data.error) {
              this.addnewpatientdialog = false;
              this.dialogdata.title = "Error";
              this.dialogdata.message = Response.data.error;
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "warning";
              this.dialogdata.show = true;
            }
          })
          .catch(err => {
            this.addnewpatientdialog = false;
            this.dialogdata.title = "Error";
            this.dialogdata.message = err;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          });
      }
    }
  }
};
</script>