<template>
  <v-container class="pa-0">
    <v-toolbar dark>
      <v-toolbar-title>Que</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Refresh</span>
      <v-btn icon @click="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list v-show="attendingque.length>0">
      <v-row class="dark justify-center">
        <h3>In cabin</h3>
      </v-row>
      <v-list-item v-for="(item, i) in attendingque" :key="i">
        <v-row>
          <v-col class="pa-0 pt-1 pb-1">
            <v-card dark>
              <v-card-title class="ma-0">{{ item.token_no }}. {{item.patient_name}}</v-card-title>
              <v-card-text class>Problem: {{ item.complaint }}</v-card-text>
              <v-card-actions class="pt-0 ma-0">
                <v-spacer />
                <v-btn x-small class="green" @click="changepatient(item.patient_id)">view report</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list v-show="waitingque.length>0">
      <v-row class="dark justify-center">
        <h3>Waiting</h3>
      </v-row>
      <v-list-item v-for="(item, i) in waitingque" :key="i">
        <v-row>
          <v-col class="pa-0 pt-1 pb-1">
            <v-card dark>
              <v-card-title class="ma-0">{{ item.token_no }}. {{item.patient_name}}</v-card-title>
              <v-card-text class>Problem: {{ item.complaint }}</v-card-text>
              <v-card-actions class="pt-0 ma-0">
                <v-spacer />
                <v-btn x-small class="green" @click="changepatient(item.patient_id)">view report</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: "doctor_dashboard",
  props: { doctorname: { type: String } },
  data: () => ({
    fetchedque: [],
    attendingque: [],
    waitingque: [],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    }
  }),
  methods: {
    changepatient(id) {
      this.$emit("changepatient", id);
    },
    refresh: function() {
      (this.fetchedque = []),
        (this.attendingque = []),
        (this.waitingque = []),
        this.$axios.post("/patient/que/get").then(Response => {
          if (Response.data.success.length > 0) {
            console.log(Response.data.success);
            Response.data.success.map(x => {
              if (
                x.quetype === "waiting" &&
                x.visiting_doctor === this.doctorname
              ) {
                this.waitingque.push(x);
              }
              if (
                x.quetype === "attending" &&
                x.visiting_doctor === this.doctorname
              ) {
                this.attendingque.push(x);
              }
            });
          }
        });
    }
  }
};
</script>