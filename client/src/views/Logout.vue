<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="start" class>
        <v-col xl="4" lg="4" md="6" sm="8" class>
          <v-card elevation="24" class="pa-6">
            <v-card-subtitle class>Thankyou for using me</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline lighten-2">Thankyou</v-card-title>
          <v-card-text class="pt-6">Thankyou for using Hospital management system</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary darken-1" text @click="dialog=false">cancel</v-btn>
            <v-btn color="primary darken-1" text @click="gotologin">login again?</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default {
  name: "logout",
  data: () => {
    return {
      send: { user_name: "", phoneno: "", password: "" },
      dialog: true
    };
  },
  methods: {
    gotologin: function() {
      this.$router.push("/");
    }
  },
  beforeCreate() {
    cookies.remove("role");
    cookies.remove("token");
  },
  destroyed() {
    this.$router.go(0);
  }
};
</script>