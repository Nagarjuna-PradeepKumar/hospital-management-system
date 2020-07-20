<template>
  <v-container>
    <v-row justify="center" v-if="patient_id===''">
      <v-col align-self="center">
        <v-alert
          color="warning"
          dark
          dense
          icon="mdi-alert-circle-outline"
          prominent
        >No patient selected. Select a patient from Search icon below.</v-alert>
      </v-col>
    </v-row>
    <component
      v-else
      v-bind:is="display"
      v-bind:doctorname="doctorname"
      v-bind:doctor_id="doctor_id"
      :patient_data="patient_data"
      :patient_record="patient_record"
      v-on:refreshdetails="refreshcontent"
    />
    <v-bottom-navigation :value="activeBtn" color="purple lighten-1" fixed>
      <v-btn
        @click="
          display = 'history';
          activeBtn = 0;
          refreshcontent();
        "
      >
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn @click="
          display = 'complaint';
          activeBtn = 1;
        ">
        <span>Attend</span>
        <v-icon>mdi-gamepad-round-outline</v-icon>
      </v-btn>

      <v-btn
        @click="
          display = 'labtest';
          activeBtn = 2;
          refreshcontent();
        "
      >
        <span>Lab</span>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>
<script>
import history from "./history";
import complaint from "./complaint";
import labtest from "./labtest";

export default {
  name: "doctor_dashboard",
  components: {
    history,
    complaint,
    labtest
  },
  props: {
    patient_id: { type: String },
    doctorname: { type: String },
    doctor_id: { type: String }
  },
  data: () => ({
    activeBtn: 0,
    display: "history",
    patient_data: {},
    patient_record: {}
  }),
  watch: {
    patient_id: function() {
      this.$axios
        .post("/patient/getbyid", { patient_id: this.patient_id })
        .then(Response => {
          if (Response.data.success) {
            this.patient_data = Response.data.success;
            this.$axios
              .post("/patient/record/getall", { patient_id: this.patient_id })
              .then(Response => {
                if (Response.data.success) {
                  this.patient_record = Response.data.success;
                  this.activeBtn = 0;
                  setTimeout((this.display = "history"), 100);
                } else {
                  alert("error");
                }
              });
          }
        });
    }
  },
  methods: {
    refreshcontent: function() {
      this.$axios
        .post("/patient/getbyid", { patient_id: this.patient_id })
        .then(Response => {
          if (Response.data.success) {
            this.patient_data = Response.data.success;
            this.$axios
              .post("/patient/record/getall", { patient_id: this.patient_id })
              .then(Response => {
                if (Response.data.success) {
                  this.patient_record = Response.data.success;
                } else {
                  alert("error");
                }
              });
          }
        });
    }
  }
};
</script>
