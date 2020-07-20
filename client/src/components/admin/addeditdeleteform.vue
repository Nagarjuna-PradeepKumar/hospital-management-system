<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="fetch"
      sort-by
      :search="search"
      class="elevation-1"
      v-if="fetched.length >= 0"
    >
      <template v-slot:top>
        <!-- <v-toolbar flat> -->
        <v-container class="pa-0">
          <v-row justify="space-around" class="pa-2" dense>
            <v-col cols="12" sm="3" align-self="center">
              <h3>All users</h3>
            </v-col>
            <v-col cols="12" sm="6" align-self="center">
              <v-text-field
                v-model="search"
                append-icon="mdi-filter"
                label="Filter"
                single-line
                hide-details
                class="pb-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" align-self="center">
              <v-row justify="center">
                <v-btn small class="ml-2 primary" @click="addnewuserform = true">
                  <v-icon color="white">mdi-plus-circle</v-icon>Add new
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <!-- </v-toolbar> -->
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.changepassword="{ item }">
        <v-icon small class="mr-2" @click="changePass(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>

    <!-- Add user form -->

    <v-dialog v-model="addnewuserform" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Add new user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="adduserform">
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-account-circle"
                    v-model="send.user_name"
                    label="User name"
                    :rules="[(v) => !!v || 'Username is required']"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-phone-in-talk"
                    v-model="send.phoneno"
                    label="Phone number"
                    :rules="[(v) => !!v || 'Phonenumber is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-home-circle"
                    v-model="send.address"
                    label="User address"
                    :rules="[(v) => !!v || 'Address is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-email"
                    v-model="send.email"
                    label="Email-Id"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-key"
                    v-model="send.password"
                    type="password"
                    label="Password"
                    :rules="[(v) => !!v || 'Password is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-autocomplete
                    dense
                    outlined
                    prepend-icon="mdi-account-tie"
                    v-model="send.user_role"
                    item-text="text"
                    item-value="value"
                    :items="roles"
                    label="User role"
                    :rules="[(v) => !!v || 'Username is required']"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="addnewuserform = false;$refs.adduserform.resetValidation();"
          >Cancel</v-btn>
          <v-btn color="primary" @click="submitadduserform">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for editing the user data -->
    <v-dialog v-model="editdialog" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Edit user's data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="editform">
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-account-circle"
                    v-model="singleform.user_name"
                    label="User name"
                    :rules="[(v) => !!v || 'Username is required']"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-phone-in-talk"
                    v-model="singleform.phoneno"
                    label="Phone number"
                    :rules="[(v) => !!v || 'Phonenumber is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-home-circle"
                    v-model="singleform.address"
                    label="User address"
                    :rules="[(v) => !!v || 'Address is required']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-email"
                    v-model="singleform.email"
                    label="Email-Id"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    dense
                    outlined
                    prepend-icon="mdi-account-tie"
                    v-model="singleform.user_role"
                    item-text="text"
                    item-value="value"
                    :items="roles"
                    label="User role"
                    :rules="[(v) => !!v || 'Username is required']"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="
              editdialog = false;
              $refs.editform.resetValidation();
            "
          >Cancel</v-btn>
          <v-btn
            color="primary"
            @click="
              editdialog = false;
              confirmedit = true;
            "
          >Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog  -->
    <!-- Delete dialogbox -->
    <v-dialog v-model="deletedialog" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Delete {{ singleform.user_name }} from database</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="deleteform">
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-account-circle"
                    v-model="singleform.user_name"
                    label="User name"
                    readonly
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-phone-in-talk"
                    v-model="singleform.phoneno"
                    label="Phone number"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-home-circle"
                    v-model="singleform.address"
                    label="User address"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-email"
                    v-model="singleform.email"
                    label="Email-Id"
                    readonly
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    dense
                    outlined
                    prepend-icon="mdi-account-tie"
                    v-model="singleform.user_role"
                    item-text="text"
                    item-value="value"
                    :items="roles"
                    label="User role"
                    readonly
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="
              deletedialog = false;
              $refs.deleteform.resetValidation();
            "
          >Cancel</v-btn>
          <v-btn
            color="primary"
            @click="
              deletedialog = false;
              confirmdelete = true;
            "
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Change password Dialogbox -->
    <v-dialog v-model="passworddialog" max-width="600px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Change {{ singleform.user_name }}'s password?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="changepassform">
              <v-row justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-account-circle"
                    v-model="singleform.user_name"
                    label="User name"
                    readonly
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-phone-in-talk"
                    v-model="singleform.phoneno"
                    label="Phone number"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col>
                  <v-text-field
                    dense
                    outlined
                    prepend-icon="mdi-key"
                    v-model="singleform.password"
                    label="Password"
                    :rules="[(v) => !!v || 'Password is required']"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="
              passworddialog = false;
              $refs.changepassform.resetValidation();
            "
          >Cancel</v-btn>
          <v-btn
            color="primary darken-1"
            @click="
              passworddialog = false;
              confirmchangepass = true;
            "
          >Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Confirm change data -->
    <v-dialog v-model="confirmedit" max-width="600px">
      <v-card>
        <v-card-title class="headline warning">
          <span>Do you really want to change data?</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <strong>
            Do not change data without the concern of the respective
            person
          </strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="confirmedit = false">Cancel</v-btn>
          <v-btn
            color="primary darken-1"
            v-on:click="confirmedit = false"
            @click="submitedit"
          >Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm Delete data -->
    <v-dialog v-model="confirmdelete" max-width="600px">
      <v-card>
        <v-card-title class="headline red">
          <span>Warning</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <strong>
            Once deleted the data cant be retrived back. Do you really want to
            delete the user?
          </strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="confirmdelete = false">Cancel</v-btn>
          <v-btn
            color="primary darken-1"
            v-on:click="confirmdelete = false"
            @click="submitdelete"
          >Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Confirm change password -->
    <v-dialog v-model="confirmchangepass" max-width="600px">
      <v-card>
        <v-card-title class="headline warning">
          <span>Warning!</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <strong>
            Do not change password without the concern of the respective
            person
          </strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="confirmchangepass = false">Cancel</v-btn>
          <v-btn
            color="primary darken-1"
            v-on:click="confirmchangepass = false"
            @click="submitchangepass"
          >Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Close only dialog box -->
    <dialog-box v-bind:dialogmessage="dialogdata" />
  </v-container>
</template>

<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  components: {
    "dialog-box": dialogbox
  },
  props: { fetch: { type: Array } },
  data: () => ({
    search: "",
    addnewuserform: false,
    editdialog: false,
    deletedialog: false,
    passworddialog: false,
    confirmedit: false,
    confirmdelete: false,
    confirmchangepass: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "user_name"
      },
      { text: "Role", value: "user_role" },
      { text: "Phone", value: "phoneno" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "password", value: "changepassword", sortable: false }
    ],
    singleform: {
      user_id: "",
      user_name: "",
      phoneno: "",
      address: "",
      email: "",
      password: "",
      user_role: ""
    },
    send: {
      user_name: "",
      user_role: "",
      phoneno: "",
      email: "",
      password: "",
      address: ""
    },
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    },
    roles: [
      { text: "Administrator", value: "admin" },
      { text: "Receptionist", value: "reception" },
      { text: "Doctor", value: "doctor" }
    ]
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    fetched() {
      return this.fetch;
    }
  },

  methods: {
    editItem: function(item) {
      console.log(item);
      (this.singleform.user_id = item._id),
        (this.singleform.user_name = item.user_name);
      this.singleform.phoneno = item.phoneno;
      this.singleform.address = item.address;
      this.singleform.email = item.email;
      this.singleform.user_role = item.user_role;
      this.editdialog = true;
    },
    deleteItem: function(item) {
      this.deletedialog = true;
      (this.singleform.user_id = item._id),
        (this.singleform.user_name = item.user_name);
      this.singleform.phoneno = item.phoneno;
      this.singleform.address = item.phoneno;
      this.singleform.email = item.email;
      this.singleform.user_role = item.user_role;
    },
    changePass: function(item) {
      this.passworddialog = true;
      (this.singleform.user_id = item._id),
        (this.singleform.user_name = item.user_name);
      this.singleform.phoneno = item.phoneno;
      this.singleform.address = item.phoneno;
      this.singleform.email = item.email;
      this.singleform.user_role = item.user_role;
    },
    submitedit: function() {
      this.$axios
        .post("/user/changedata", {
          user_id: this.singleform.user_id,
          user_name: this.singleform.user_name,
          user_role: this.singleform.user_role,
          phoneno: this.singleform.phoneno,
          email: this.singleform.email,
          address: this.singleform.address
        })
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Edited " + this.singleform.user_name + "'s data";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
            this.$emit("clearfetch");
            for (var key in this.singleform) {
              this.singleform[key] = "";
            }
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
    },
    submitdelete: function() {
      this.$axios
        .post("/user/delete", {
          user_id: this.singleform.user_id
        })
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Deleted " + this.singleform.user_name + "'s data";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
            this.$emit("clearfetch");
            for (var key in this.singleform) {
              this.singleform[key] = "";
            }
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
    },
    submitchangepass: function() {
      this.$axios
        .post("/user/changepassword", {
          user_id: this.singleform.user_id,
          password: this.singleform.password
        })
        .then(Response => {
          if (Response.data.success) {
            this.dialogdata.title = "Success";
            this.dialogdata.message =
              "Changed " + this.singleform.user_name + "'s password";
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "success";
            this.dialogdata.show = true;
            this.$emit("clearfetch");
            for (var key in this.singleform) {
              this.singleform[key] = "";
            }
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
    },
    submitadduserform: function() {
      if (this.$refs.adduserform.validate()) {
        this.$axios
          .post("/user/create", this.send)
          .then(Response => {
            if (Response.data.success) {
              this.addnewuserform = false;
              this.dialogdata.title = "Success";
              this.dialogdata.message =
                "Created new user " + this.send.user_name;
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "success";
              this.dialogdata.show = true;
              for (var key in this.send) {
                this.send[key] = "";
              }
              this.$refs.adduserform.resetValidation();
              this.$emit("clearfetch");
            }
            if (Response.data.error) {
              this.addnewuserform = false;
              this.dialogdata.title = "Error";
              this.dialogdata.message = Response.data.error;
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "warning";
              this.dialogdata.show = true;
            }
          })
          .catch(err => {
            this.addnewuserform = false;
            this.dialogdata.title = "Error";
            this.dialogdata.message = err;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          });
      }
    }
  }
};
</script>
