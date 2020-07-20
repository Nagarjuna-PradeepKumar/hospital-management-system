<template>
  <v-app fluid class="fill-height" style="background: #fffff;">
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
      <queview />
    </v-navigation-drawer>
    <v-app-bar app dense dark style="position:sticky;top:0;max-height:50px;left:0;z-index:10">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Reception</v-toolbar-title>
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

    <keep-alive>
      <v-main class="pt-0 mt-0">
        <component v-bind:is="component" />
      </v-main>
    </keep-alive>
  </v-app>
</template>

<script>
import Cookies from "universal-cookie";
import addpatient from "../components/reception/addpatient.vue";
import patient_token_and_edit from "../components/reception/patient_token_and_edit.vue";
import queview from "../components/reception/queview.vue";
const cookies = new Cookies();
export default {
  components: {
    addpatient,
    patient_token_and_edit,
    queview
  },
  data: () => {
    return {
      drawer: false,
      que: false,
      user_name: "",
      user_role: "",
      item: 0,
      component: "patient_token_and_edit",
      listitems: [
        {
          key: "1",
          icon: "mdi-clipboard-plus",
          title: "Patient token",
          subtitle: "search, generate token",
          display: "patient_token_and_edit"
        }
      ]
    };
  },
  beforeCreate() {
    const access = ["admin", "doctor", "reception"];
    this.$axios
      .post("/user/verify", { token: cookies.get("token") })
      .then(Response => {
        if (Response.data.success) {
          if (access.findIndex(x => x === Response.data.role) !== -1) {
            (this.user_name = Response.data.name),
              (this.user_role = Response.data.role);
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
    }
  }
};
</script>
