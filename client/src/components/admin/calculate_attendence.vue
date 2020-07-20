<template>
  <!-- Searchbar -->
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="6" lg="9" md="10" sm="8" class v-if="!showreport">
        <v-card elevation="5">
          <v-form class="ma-2">
            <v-container>
              <v-row class="ma-0 pa-0 justify-center">
                <h3>Monthly Report</h3>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    clearable
                    :items="names"
                    dense
                    outlined
                    @change="submitsearch"
                    prepend-icon="mdi-account-circle"
                    v-model="search.user_name"
                    label="User name"
                    v-on:keypress.enter="submitsearch"
                  />
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-autocomplete
                    clearable
                    :items="phone"
                    dense
                    outlined
                    @change="submitsearch"
                    prepend-icon="mdi-phone-in-talk"
                    v-model="search.phoneno"
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
        <v-data-table
          :headers="headers"
          :items="fetched"
          sort-by
          :search="filter"
          class="elevation-1"
          v-if="!showreport"
        >
          <template v-slot:top>
            <v-container class="pa-0">
              <v-row justify="space-around" class="pa-2" dense>
                <v-col cols="12" sm="4" align-self="center">
                  <h3>Attendence register</h3>
                </v-col>
                <v-col cols="12" sm="5" align-self="center">
                  <v-text-field
                    v-model="filter"
                    append-icon="mdi-filter"
                    label="Filter"
                    single-line
                    hide-details
                    class="pb-5"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" align-self="center">
                  <v-row justify="center">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="month"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="month"
                          label="YYYY/MM/DD"
                          prepend-icon="mdi-calendar"
                          hide-details
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          style="max-width:150px"
                          class="pb-5"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        type="month"
                        @change="changedate"
                        v-model="month"
                        no-title
                        scrollable
                      ></v-date-picker>
                    </v-menu>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="green" @click="openreportpage(item)">mdi-file-chart</v-icon>
          </template>
        </v-data-table>
        <reportpage v-bind:data="reportfield" v-on:changeview="changeview" v-if="showreport" />
      </v-col>
    </v-row>

    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import monthly_reportform from "./monthly_reportform";
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "attendence",
  components: {
    reportpage: monthly_reportform,
    "dialog-box": dialogbox
  },
  data: () => ({
    showreport: false,
    menu: false,
    month: "",
    reportfield: { user_id: "", month: "", user_name: "", phoneno: "" },
    search: { user_name: undefined, phoneno: undefined },
    fetched: [],
    filter: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "user_name"
      },
      { text: "Role", value: "user_role" },
      { text: "Phone", value: "phoneno" },
      { text: "Report", value: "actions", sortable: false }
    ],
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
      this.showreport = false;
      this.$axios
        .post("/user/getdata", this.search)
        .then(Response => {
          console.log(Response.data);
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
            console.log("error");
          }
        })
        .catch(err => {
          this.dialogdata.title = "Error";
          this.dialogdata.message = err;
          this.dialogdata.buttontext = "Ok";
          this.dialogdata.type = "warning";
          this.dialogdata.show = true;
          console.log("error");
        });
    },
    changeview: function() {
      if (this.showreport === true) {
        this.showreport = false;
      } else {
        this.showreport = true;
      }
    },
    changedate: function() {
      this.$refs.menu.save(this.month);
    },
    openreportpage(item) {
      if (this.month === "") {
        this.dialogdata.title = "Error";
        this.dialogdata.message = "Select a month to proceed";
        this.dialogdata.buttontext = "Ok";
        this.dialogdata.type = "warning";
        this.dialogdata.show = true;
      } else {
        console.log(this.reportfield);
        this.reportfield.user_id = item._id;
        this.reportfield.month = this.month;
        this.reportfield.user_name = item.user_name;
        this.reportfield.phoneno = item.phoneno;
        this.showreport = true;
      }
    }
  },
  computed: {
    phone() {
      return [...new Set(this.fetched.map(x => x.phoneno))];
    },
    names() {
      return [...new Set(this.fetched.map(x => x.user_name))];
    }
  },
  created() {
    this.$axios
      .post("/user/getdata", this.search)
      .then(Response => {
        if (Response.data.success) {
          this.fetched = Response.data.success;
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
};
</script>
