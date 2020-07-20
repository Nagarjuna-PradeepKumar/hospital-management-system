<template>
  <!-- Searchbar -->
  <v-container>
    <v-row justify="center" class="pb-0 mb-0">
      <v-col cols="12" xl="4" lg="8" md="10" sm="8">
        <v-card elevation="5" color="">
          <v-form class="ma-2">
            <v-container>
              <v-spacer />
              <v-row justify="center">
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    clearable
                    outlined
                    dense
                    @change="submitsearch"
                    prepend-icon="mdi-account-circle"
                    v-model="search.user_name"
                    label="User name"
                    :items="names"
                    v-on:keypress.enter="submitsearch"
                    class="mt-5"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    clearable
                    outlined
                    dense
                    @change="submitsearch"
                    prepend-icon="mdi-phone-in-talk"
                    v-model="search.phoneno"
                    label="Phone number"
                    :items="phone"
                    v-on:keypress.enter="submitsearch"
                    class="mt-5"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <!-- Results view -->
    <v-row id="resultpane" justify="center" class="pa-0 ma-0">
      <v-col cols="12" xl="4" lg="8" md="10" sm="8">
        <edit-delete-form v-bind:fetch="fetched" v-on:clearfetch="resetfetch" />
      </v-col>
    </v-row>
    <v-spacer />
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import addeditdeleteform from "./addeditdeleteform";
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "adduser",
  components: {
    "edit-delete-form": addeditdeleteform,
    "dialog-box": dialogbox,
  },
  data: () => ({
    search: { user_name: undefined, phoneno: undefined },
    fetched: [],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: "",
    },
  }),
  methods: {
    print() {
      console.log("search : " + this.search.user_name, this.search.phoneno);
      console.log("name : " + this.names);
      console.log("phone : " + this.phone);
    },
    submitsearch: function() {
      this.$axios
        .post("/user/getdata", this.search)
        .then((Response) => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
          }
        })
        .catch((err) => {
          this.dialogdata.title = "Error";
          this.dialogdata.message = err;
          this.dialogdata.buttontext = "Ok";
          this.dialogdata.type = "warning";
          this.dialogdata.show = true;
          console.log("error");
        });
    },
    resetfetch: function() {
      this.$axios
        .post("/user/getdata", this.search)
        .then((Response) => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
            console.log(this.fetched);
          }
        })
        .catch((err) => {
          this.dialogdata.title = "Error";
          this.dialogdata.message = err;
          this.dialogdata.buttontext = "Ok";
          this.dialogdata.type = "warning";
          this.dialogdata.show = true;
          console.log("error");
        });
    },
  },
  created() {
    this.$axios
      .post("/user/getdata", this.search)
      .then((Response) => {
        if (Response.data.success) {
          this.fetched = Response.data.success;
        }
      })
      .catch((err) => {
        this.dialogdata.title = "Error";
        this.dialogdata.message = err;
        this.dialogdata.buttontext = "Ok";
        this.dialogdata.type = "warning";
        this.dialogdata.show = true;
        console.log("error");
      });
  },
  computed: {
    phone() {
      return [...new Set(this.fetched.map((x) => x.phoneno))];
    },
    names() {
      return [...new Set(this.fetched.map((x) => x.user_name))];
    },
  },
};
</script>
