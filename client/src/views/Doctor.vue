<template>
  <v-app fluid class="fill-height" style="background: #fffff;">
    <!--Left-- Navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      fixed
      disable-resize-watcher
      clipped
      style="z-index:11"
    >
      <v-list-item class="pb-2 pt-2 justify-center">
        <v-list-item-avatar>
          <v-icon class="white--text" large>mdi-doctor</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Hello Doctor !</v-list-item-title>
          <v-list-item-subtitle>{{ user_name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item-group v-model="item" color="blue">
        <v-list-item
          v-for="listitem in listitems"
          :key="listitem.key"
          @click="component = listitem.display;drawer=!drawer"
          link
          class="justify-center"
        >
          <v-list-item-avatar>
            <v-icon class="blue--text">{{listitem.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ listitem.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ listitem.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
      <v-list-item
        class="pb-2 pt-2 justify-center"
        v-on:click="changepage"
        v-if="user_role==='admin'"
      >
        <v-list-item-avatar>
          <v-icon class="white--text" large>mdi-shield-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Admin view</v-list-item-title>
          <v-list-item-subtitle>Switch to Admin view</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <!-- Right --Navigation Drawer -->
    <v-navigation-drawer
      v-model="que"
      right
      app
      dark
      fixed
      disable-resize-watcher
      clipped
      style="z-index:11"
    >
      <!-- ########################-----Que component------############### -->
      <doc_que_view v-on:changepatient="changepatient" v-bind:doctorname="user_name" />
      <!-- ########################-----Que component------############### -->
    </v-navigation-drawer>
    <!-- -----------------------Top bar------------------- -->
    <v-app-bar app dense dark style="position:sticky;top:0;max-height:50px;left:0;z-index:10">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Doctor {{ user_name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small depressed class="mr-5" @click="que=!que">
        <v-icon>mdi-clipboard-list</v-icon>Que
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small icon v-bind="attrs" v-on="on" right class="mr-5" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>logout</span>
      </v-tooltip>
    </v-app-bar>

    <!-- ####################-------Main content--------######## -->
    <v-main class="pt-0 mt-0">
      <doctor_dashboard
        v-bind:doctor_id="doctor_id"
        v-bind:doctordatas="doctordatas"
        v-bind:patient_id="patient_id"
        v-bind:doctorname="user_name"
        v-show="component==='doctor_dashboard'"
      />
      <patient_console
        v-bind:doctor_id="doctor_id"
        v-bind:patient_id="patient_id"
        v-bind:doctorname="user_name"
        v-show="component==='patient_console'"
      />
    </v-main>
    <!-- ####################-------Main content-----########## -->
    <v-btn
      v-show="true"
      class="black darken-4"
      dark
      fixed
      bottom
      right
      fab
      @click="showsearch=true"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <!-- Search patient dialogbox -->
    <v-dialog v-model="showsearch" max-width="600px">
      <v-data-table
        :headers="headers"
        :items="fetch"
        sort-by
        :search="search"
        class="elevation-1"
        dark
      >
        <template v-slot:top>
          <v-toolbar flat dark>
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
          <v-icon class="mr-2" @click="openItem(item)">mdi-arrow-top-right-bottom-left</v-icon>
          <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
        </template>
      </v-data-table>
    </v-dialog>
    <!-- Dialog for editing the patient data -->
    <v-dialog v-model="editdialog" max-width="600px" dark>
      <v-card>
        <v-card-title>
          <span class="headline">Patient's data</span>
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
          <v-btn
            color="blue darken-1"
            text
            @click="editdialog=false;showsearch=false;changepatient(singleform.patient_id)"
          >See data</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog  -->
  </v-app>
</template>

<script>
import Cookies from "universal-cookie";
import doctor_dashboard from "../components/doctor/doctor_dashboard";
import patient_console from "../components/doctor/patient_console";
import doc_que_view from "../components/doctor/doctor_que_view";
const cookies = new Cookies();

export default {
  components: {
    doctor_dashboard: doctor_dashboard,
    patient_console: patient_console,
    doc_que_view: doc_que_view
  },
  data: () => {
    return {
      search: "",
      fetch: [],
      headers: [
        { text: "Name", sortable: true, value: "patient_name" },
        { text: "Age", value: "patient_age" },
        { text: "Phone", value: "patient_phoneno" },
        { text: "View", value: "actions", sortable: false }
      ],
      showsearch: false,
      editdialog: false,
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
      drawer: false,
      que: false,
      user_name: "",
      user_role: "",
      patient_id: "",
      doctor_id: "",
      doctordatas: "",
      item: 0,
      component: "doctor_dashboard",
      listitems: [
        {
          key: "1",
          icon: "mdi-view-dashboard-variant",
          title: "Dashboard",
          subtitle: "View your stats",
          display: "doctor_dashboard"
        },
        {
          key: "2",
          icon: "mdi-notebook",
          title: "Patient console",
          subtitle: "patient record view",
          display: "patient_console"
        }
      ]
    };
  },
  beforeCreate() {
    const access = ["doctor"];
    this.$axios
      .post("/user/verify", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          if (access.findIndex(x => x === Response.data.role) !== -1) {
            (this.user_name = Response.data.name),
              (this.user_role = Response.data.role);
            this.doctor_id = Response.data.id;
            this.$axios
              .post("/doctorstats/getstats", { doctor_id: Response.data.id })
              .then(Response => {
                if (Response.data.success) {
                  console.log(Response.data.success);
                  this.doctordatas = Response.data.success;
                } else {
                  alert("Sorry! could not fetch your statistics");
                }
              });
          } else {
            alert("Permission denied");
          }
        }
        if (Response.data.error) {
          alert(Response.data.error);
        }
      })
      .catch(Error => {
        alert(Error);
      });
  },
  methods: {
    changepage() {
      this.$router.push("admin").catch(err => {
        err;
      });
    },
    logout() {
      this.$router.push("/logout");
    },
    changepatient(value) {
      setTimeout(() => (this.component = "patient_console"), 100);
      this.patient_id = value;
      this.item = 1;
    },
    openItem: function(item) {
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
    }
  },
  created() {
    this.$axios
      .post("/patient/getdata", {
        patient_name: undefined,
        patient_phoneno: undefined
      })
      .then(Response => {
        if (Response.data.success) {
          console.log("success");
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
  }
};
</script>
