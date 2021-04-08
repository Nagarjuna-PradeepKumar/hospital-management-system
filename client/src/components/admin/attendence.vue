<template>
  <!-- Searchbar -->
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="6" lg="9" md="10" sm="8" class="ma-5">
        <v-card elevation="5">
          <v-form class="ma-2">
            <v-container>
              <v-row class="ma-0 pa-0 justify-center">
                <h3>Attendence</h3>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    clearable
                    :items="names"
                    @change="submitsearch"
                    outlined
                    dense
                    prepend-icon="mdi-account-circle"
                    v-model="search.user_name"
                    label="User name"
                    v-on:keypress.enter="submitsearch"
                  />
                </v-col>
                <v-col cols="12" sm="5" md="4">
                  <v-autocomplete
                    clearable
                    :items="phone"
                    outlined
                    dense
                    @change="submitsearch"
                    prepend-icon="mdi-phone-in-talk"
                    v-model="search.phoneno"
                    label="Phone number"
                    v-on:keypress.enter="submitsearch"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="search.date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="search.date"
                        label="YYYY/MM/DD"
                        outlined
                        dense
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="max-width:150px"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @change="submitsearch"
                      v-model="search.date"
                      no-title
                      scrollable
                      :min="mindate"
                      :max="maxdate"
                    >
                      <!-- <v-date-picker
                      @change="changedate"
                      v-model="search.date"
                      no-title
                      scrollable
                      >-->
                    </v-date-picker>
                  </v-menu>
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
        <attendence-form
          v-bind:fetch="fetched"
          v-bind:selecteddate="search.date"
          v-on:clearfetch="resetfetch"
        />
      </v-col>
    </v-row>

    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import attendence_form from "./attendence_form";
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "attendence",
  components: {
    "attendence-form": attendence_form,
    "dialog-box": dialogbox
  },
  data: () => ({
    menu: false,
    search: {
      user_name: undefined,
      phoneno: undefined,
      date: `${String(new Date().getFullYear())}-${String(
        "0" + (new Date().getMonth() + 1)
      ).slice(-2)}-${String("0" + new Date().getDate()).slice(-2)}`
    },
    fetched: [],
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    },
    maxdate: `${String(new Date().getFullYear())}-${String(
      "0" + (new Date().getMonth() + 1)
    ).slice(-2)}-${String("0" + new Date().getDate()).slice(-2)}`,
    mindate: `${String(new Date(Date.now() - 2.592e8).getFullYear())}-${String(
      "0" + (new Date(Date.now() - 2.592e8).getMonth() + 1)
    ).slice(-2)}-${String("0" + new Date(Date.now() - 2.592e8).getDate()).slice(
      -2
    )}`
  }),
  methods: {
    submitsearch: function() {
      this.$refs.menu.save(this.search.date);
      this.$axios
        .post("/attendence/getdata", this.search)
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
          console.log("error");
        });
    },
    resetfetch: function() {
      this.$axios
        .post("/attendence/getdata", this.search)

        .then(Response => {
          if (Response.data.success) {
            this.fetched = Response.data.success;
            console.log(this.fetched);
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
    changedate: function() {
      this.$refs.menu.save(this.search.date);
      this.submitsearch();
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
      .post("/attendence/getdata", this.search)
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
  }
};
</script>
