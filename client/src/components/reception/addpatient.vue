<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4" md="8" sm="8" align-self="center" class="ma-5">
        <v-form style="border:1px solid; border-radius:5px" ref="form">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  v-model="send.patient_name"
                  label="Patient name"
                  :rules="[v => !!v || 'Name is required']"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  prepend-icon="mdi-numeric"
                  v-model="send.patient_age"
                  label="Patient age"
                  :rules="[v => !!v || 'Age is required']"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-select
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
                  prepend-icon="mdi-home-circle"
                  v-model="send.patient_address"
                  label="User address"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="send.patient_email"
                  label="Email-Id"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
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
                  prepend-icon="mdi-briefcase"
                  v-model="send.patient_occupation"
                  label="Occupation"
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-water"
                  v-model="send.patient_blood_group"
                  label="Blood group"
                />
              </v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  prepend-icon="mdi-human"
                  v-model="send.patient_maritalstatus"
                  label="Marital status"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">
                <v-btn block v-on:click="this.submitaddnewuserform" color="primary">Submit</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "adduser",

  components: {
    "dialog-box": dialogbox
  },

  data: function() {
    return {
      dialogsuccess: false,
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
    };
  },
  methods: {
    submitaddnewuserform: function() {
      this.$axios
        .post("/patient/create", this.send)
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Created new user " + this.send.patient_name;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
            for (var key in this.send) {
              this.send[key] = "";
            }
            this.$refs.form.resetValidation();
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
