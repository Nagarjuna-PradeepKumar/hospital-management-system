<template>
  <v-container fluid class="pt-0 mt-0 pb-0 mb-0">
    <v-row class="justify-center">
      <v-col cols="12" xl="6" lg="9" md="10" sm="8" class="ma-5">
        <v-stepper v-model="element">
          <v-stepper-header class="primary lighten-3">
            <v-stepper-step :complete="element > 1" step="1">Select month</v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="element > 2" step="2">View/Select holidays</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="grey lighten-2">
            <!-- --------1. First Stepper item -->
            <v-stepper-content step="1" class="justify-center">
              <v-container>
                <v-row class="justify-center pb-2" align="center">
                  <v-divider />
                  <h3>Select month</h3>
                  <v-divider />
                </v-row>
                <v-row class="justify-center" align="center">
                  <v-date-picker v-model="month" type="month" elevation="5" />
                </v-row>
                <v-row justify="end" class="pt-5">
                  <v-btn color="primary" @click="getdates">next</v-btn>
                </v-row>
              </v-container>
            </v-stepper-content>
            <!-- --------2. Second Stepper item -->
            <v-stepper-content step="2">
              <v-container>
                <v-row class="justify-center pb-2" align="center">
                  <v-divider />
                  <h3>View/Select holidays</h3>
                  <v-divider />
                </v-row>
                <v-alert
                  dismissible
                  :type="alerttype"
                  class="mb-2"
                  v-model="showalert"
                >{{ alertmessage }}</v-alert>
                <v-row class="justify-center pt-0 mt-0">
                  <v-date-picker
                    v-model="holidays"
                    :min="month"
                    :max="monthend"
                    multiple
                    color="red"
                  />
                </v-row>
                <v-row justify="end" class="pt-5">
                  <v-btn text color="secondary" @click="element=1;showalert=false;holidays=[]">back</v-btn>
                  <v-btn color="primary" @click="submitholidays">submit</v-btn>
                </v-row>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>

    <!-- Close only dialog box -->
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import dialogbox from "../dialogbox/messaga.vue";

export default {
  name: "workingdays",
  components: {
    "dialog-box": dialogbox
  },
  data: function() {
    return {
      element: 1,
      showalert: false,
      alertmessage: "",
      alerttype: "",
      month: `${String(new Date().getFullYear())}-${String(
        "0" + (new Date().getMonth() + 1)
      ).slice(-2)}`,
      currentdate: `${String(new Date().getFullYear())}-${String(
        "0" + (new Date().getMonth() + 1)
      ).slice(-2)}-${String("0" + new Date().getDate()).slice(-2)}`,
      holidays: [],
      dialogdata: {
        show: false,
        type: "",
        title: "",
        message: "",
        buttontext: ""
      }
    };
  },

  methods: {
    getdates: function() {
      this.$axios
        .post("/calendar/fetchmonth", { yearmonth: this.month })
        .then(Response => {
          if (Response.data.success) {
            if (Response.data.success.holidays.length > 0) {
              this.holidays = Response.data.success.holidays;
            } else {
              this.alerttype = "info";
              this.showalert = true;
              this.alertmessage = "No holidays planned in this month";
              setTimeout(this.pushit, 10);
              setTimeout(this.popit, 20);
            }
            this.element = 2;
          }
          if (Response.data.error) {
            console.log(Response.data.error);
            this.element = 2;
            this.alerttype = "warning";
            this.showalert = true;
            this.alertmessage =
              "No plan has been created for this month in the past";
            setTimeout(this.pushit, 100);
            setTimeout(this.popit, 200);
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
    submitholidays: function() {
      this.$axios
        .post("/calendar/holiday", {
          yearmonth: this.month,
          holidays: this.holidays
        })
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message = "Holidays plan has been submited";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = "Error updating to database";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "danger";
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
    pushit: function() {
      this.holidays = [this.month];
    },
    popit: function() {
      this.holidays = [];
    }
  },
  computed: {
    monthend: function() {
      return `${this.month}-31`;
    }
  }
};
</script>