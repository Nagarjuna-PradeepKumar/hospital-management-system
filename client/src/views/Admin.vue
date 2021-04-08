<template>
  <v-app fluid class="fill-height" style="background:  #cdcdcd ">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      fixe
      disable-resize-watcher
      clipped
      style="z-index:11"
    >
      <v-list-item class="pb-2 pt-2">
        <v-list-item-avatar>
          <v-icon class="white--text" large>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Signed in as</v-list-item-title>
          <v-list-item-subtitle>{{ user_name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item-group v-model="item" color="blue">
        <v-list-item
          v-for="listitem in listitems"
          :key="listitem.key"
          @click="component = listitem.display;drawer=!drawer"
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

      <v-list-item class="pb-2 pt-2" v-on:click="changepage">
        <v-list-item-avatar>
          <v-icon class="white--text" large>mdi-shield-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Reception</v-list-item-title>
          <v-list-item-subtitle>Switch to reception view</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar app dense dark style="position:sticky;top:0;max-height:48px;left:0;z-index:10">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Administrator</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small icon v-bind="attrs" v-on="on" right class="mr-5" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>logout</span>
      </v-tooltip>
    </v-app-bar>
    <v-main class="pt-0 mt-0">
      <keep-alive>
        <component v-bind:is="component" />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import Cookies from "universal-cookie";
import addeditdeleteuser from "../components/admin/addeditdeleteuser.vue";
import workingdays from "../components/admin/workingdays.vue";
import attendence from "../components/admin/attendence.vue";
import calculateattendence from '../components/admin/calculate_attendence.vue'

const cookies = new Cookies();
export default {
  components: {
    addeditdeleteuser,
    workingdays,
    attendence,
    calculateattendence
  },
  data: () => {
    return {
      item: 0,
      drawer: false,
      user_name: "",
      user_role: "",
      component: "addeditdeleteuser",
      listitems: [
        {
          key: "1",
          icon: "mdi-pencil-outline",
          title: "Users",
          subtitle: "Add, change or delete users",
          display: "addeditdeleteuser"
        },
        {
          key: "2",
          icon: "mdi-calendar-month",
          title: "Plan working days",
          subtitle: "Select the working days",
          display: "workingdays"
        },
        {
          key: "3",
          icon: "mdi-check-all",
          title: "Attendence",
          subtitle: "Mark attendence",
          display: "attendence"
        },
        {
          key: "4",
          icon: "mdi-file-chart",
          title: "Monthly report",
          subtitle: "Calculate attendence",
          display: "calculateattendence"
        }
      ]
    };
  },
  beforeCreate() {
    const access = ["admin", "doctor"];
    this.$axios
      .post("/user/verify", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          if (access.findIndex(x => x === Response.data.role) !== -1) {
            (this.user_name = Response.data.name),
              (this.user_role = Response.data.role);
          } else {
            this.$router.push("/" + cookies.get("role"));
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
      this.$router.push("reception").catch(err => {
        err;
      });
    },
    logout() {
      this.$router.push("/logout");
    }
  }
};
</script>
