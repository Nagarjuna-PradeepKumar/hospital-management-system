<template>
  <v-app fluid class="fill-height" style="background: #484848">
    <v-spacer></v-spacer>
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col xl="4" lg="4" md="6" sm="8" class>
          <v-card elevation="24" class="pa-6">
            <v-card-subtitle class>Login</v-card-subtitle>
            <v-form>
              <v-text-field
                label="username"
                type="text"
                v-model="send.user_name"
                prepend-icon="mdi-account-box"
                required
                :rules="[(v) => !!v || 'Username is required']"
              />
              <v-text-field
                label="phone number"
                type="text"
                v-model="send.phoneno"
                prepend-icon="mdi-cellphone-android"
                required
                :rules="[(v) => !!v || 'Username is required']"
              />
              <v-text-field
                label="password"
                type="password"
                v-model="send.password"
                prepend-icon="mdi-lock"
                required
                :rules="[(v) => !!v || 'Username is required']"
                v-on:keypress.enter="submitform"
              />
              <v-btn block small class="primary" @click="submitform"
                >Login</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline warning lighten-2">Error!</v-card-title>
          <v-card-text class="pt-6">{{ errormessage }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialog = false"
              >Agree</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-spacer></v-spacer>
  </v-app>
</template>

<script>
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default {
  data: () => {
    return {
      send: { user_name: "", phoneno: "", password: "" },
      dialog: false,
      errormessage: "",
    };
  },
  methods: {
    submitform: function () {
      this.$axios
        .post("/user/login", this.send)
        .then((Response) => {
          if (Response.data.success) {
            cookies.set("token", Response.data.success, {
              expires: new Date(Date.now() + 2.592e8),
            });
            cookies.set("role", Response.data.role, {
              expires: new Date(Date.now() + 2.592e8),
            });
            this.$router.push(Response.data.role);
          }
          if (Response.data.error) {
            (this.errormessage = Response.data.error), (this.dialog = true);
          }
        })
        .catch((Error) => {
          alert(Error);
        });
    },
  },
  beforeCreate() {
    if (cookies.get("token")) {
      this.$axios
        .post("/user/verify", { token: cookies.get("token") })
        .then((Response) => {
          if (Response.data.success) {
            this.$router.push(Response.data.role);
          }
          if (Response.data.error) {
            (this.errormessage = Response.data.error), (this.dialog = true);
          }
        });
    }
  },
  destroyed() {
    this.$router.go(0);
  },
};
</script>