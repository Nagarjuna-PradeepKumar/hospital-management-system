<template>
  <v-container fluid class="pt-0 mt-0">
    <v-alert dismissible type="error" class="ma-0" v-model="error">{{
      errormessage
    }}</v-alert>
    <v-card elevation="5">
      <v-row style="background:#27272f;color:white">
        <v-col cols="12" sm="6" md="6">Name : {{ data.user_name }}</v-col>
        <v-col cols="12" sm="5" md="5">Month : {{ data.month }}</v-col>
        <v-col cols="12" sm="5" md="1"
          ><v-btn icon color="red" @click="changeview"
            ><v-icon color="red">mdi-close-circle</v-icon></v-btn
          ></v-col
        >
      </v-row>
      <v-row justify="center" style="background:#787878;color:white">
        <v-col>
          <v-row justify="center">
            <v-date-picker
              v-model="absent"
              multiple
              color="red"
              readonly
              no-title
              :min="data.month"
              :max="data.month + '-31'"
              class="red"
            ></v-date-picker></v-row
        ></v-col>

        <v-col>
          <v-card>
            <v-card-title
              >Total no.of working days :{{ workingdays.length }}</v-card-title
            >
            <v-card-title
              >Total no.of days leave :{{ absentdays.length }}</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
      <dialog-box v-bind:dialogmessage="dialogdata" />
    </v-card>
  </v-container>
</template>

<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  components: {
    "dialog-box": dialogbox,
  },
  props: { data: { type: Object } },
  data: () => ({
    error: false,
    errormessage: "",
    absent: [],
    workingdays: [],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: "",
    },
  }),

  computed: {
    fetched() {
      return this.fetch;
    },
    date() {
      return this.selecteddate;
    },
    absentdays: function() {
      return this.absent;
    },
  },

  methods: {
    changeview() {
      this.$emit("changeview");
    },
  },
  created() {
    this.$axios
      .post("/attendence/calculateattendence", {
        user_id: this.data.user_id,
        month: this.data.month,
      })
      .then((Response) => {
        if (Response.data.success) {
          this.absent = Response.data.success;
          this.workingdays = Response.data.workingdays;
        }
        if (Response.data.error) {
          this.error = true;
          this.errormessage = Response.data.error;
          // this.dialogdata.title = "Error";
          // this.dialogdata.message = Response.data.error;
          // this.dialogdata.buttontext = "Ok";
          // this.dialogdata.type = "warning";
          // this.dialogdata.show = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
