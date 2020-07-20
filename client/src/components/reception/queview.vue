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
        <h3>Attending</h3>
      </v-row>
      <v-list-item v-for="(item, i) in attendingque" :key="i">
        <v-row>
          <v-col class="pa-0 pt-1 pb-1">
            <v-card dark>
              <span>Token no: {{ item.token_no }}</span>
              <v-card-title>{{item.patient_name}}</v-card-title>
              <v-card-text>Visiting doctor: {{ item.visiting_doctor }}</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn small class="green" @click="checkout(item)">checkout</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list v-if="waitingque.length>0">
      <v-row class="dark justify-center">
        <h3>Waiting</h3>
      </v-row>
      <v-list-item v-for="(item, i) in waitingque" :key="i">
        <v-row>
          <v-col class="pa-0 pt-1 pb-1">
            <v-card dark>
              <span>Token no: {{ item.token_no }}</span>
              <v-card-title>{{item.patient_name}}</v-card-title>
              <v-card-text>To visit doctor: {{ item.visiting_doctor }}</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn small class="green" @click="letin(item)">let in</v-btn>
                <v-btn small class="red" right @click="left(item)">left</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
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
    refresh: function() {
      (this.fetchedque = []),
        (this.attendingque = []),
        (this.waitingque = []),
        this.$axios.post("/patient/que/get").then(Response => {
          if (Response.data.success.length > 0) {
            Response.data.success.map(x => {
              if (x.quetype === "waiting") {
                this.waitingque.push(x);
              }
              if (x.quetype === "attending") {
                this.attendingque.push(x);
              }
            });
          } else {
            this.waitingque = [];
            this.attendingque = [];
          }
        });
    },
    letin: function(item) {
      this.$axios
        .post("/patient/que/letinside", { patient_id: item.patient_id })
        .then(Response => {
          if (Response.data.success) {
            const index = this.waitingque.indexOf(item);
            if (index > -1) {
              this.waitingque.splice(index, 1);
            }
            this.attendingque.push(item);
          }
        });
    },
    checkout: function(item) {
      this.$axios
        .post("/patient/que/delete", { patient_id: item.patient_id })
        .then(Response => {
          if (Response.data.success) {
            const index = this.attendingque.indexOf(item);
            if (index > -1) {
              this.attendingque.splice(index, 1);
            }
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Removed patient " + item.patient_name + " from que";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
          }
        });
    },
    left: function(item) {
      this.$axios
        .post("/patient/que/delete", { patient_id: item.patient_id })
        .then(Response => {
          if (Response.data.success) {
            const index = this.waitingque.indexOf(item);
            if (index > -1) {
              this.waitingque.splice(index, 1);
            }
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Removed patient " + item.patient_name + " from que";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
          }
        });
    }
  }
};
</script>