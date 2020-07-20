<template>
  <v-container>
    <v-row justify="center" class="pb-0 mb-0" v-if="Object.keys(patient_data).length !== 0">
      <v-col cols="12" xl="6" lg="10" md="12" sm="12">
        <!-- ###########-----------Complaints Display------------######### -->
        <v-container>
          <v-card class="grey">
            <v-card-title class="justify-space-between grey">
              <strong>Complaints</strong>
              <v-btn icon color="white" class="red" @click="maincomplaints.show = true">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">
              <v-row v-if="maincomplaints.datas.length <= 0" class="ma-3 pa-3 grey lighten-2">
                <span>
                  Click
                  <v-btn small icon>
                    <v-icon small color="black">mdi-plus</v-icon>
                  </v-btn>icon, to add a complaint
                </span>
              </v-row>
              <v-expansion-panels>
                <v-expansion-panel v-for="(item, i) in maincomplaints.datas" :key="i">
                  <v-expansion-panel-header v-slot="{ open }" class="lime lighten-3">
                    <v-row no-gutters>
                      <v-col cols="12" md="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <v-row justify="start" align="center" v-if="open" class="pl-6">
                            <div>
                              <v-btn dark @click="deletecomplaint(item.complaint_id, i)">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </div>
                          </v-row>
                          <v-chip-group v-else no-gutters small pills column>
                            <v-chip
                              v-for="(list, i) in item.complaints"
                              :key="i"
                              class="mr-2 lime lighten-2"
                            >
                              <v-avatar left class="green darken-1">
                                {{
                                i + 1
                                }}
                              </v-avatar>
                              {{ list }}
                            </v-chip>
                          </v-chip-group>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="lime lighten-4">
                    <v-container class="pa-0 ma-0">
                      <v-row class="pb-0 mb-0">
                        <v-col cols="12" md="6" class="elevation-1">
                          <strong>
                            <u>Complaints :</u>
                          </strong>
                          <ul>
                            <li v-for="(list, i) in item.complaints" :key="i">{{ list }}</li>
                          </ul>
                        </v-col>
                        <v-col cols="12" md="6" class="elevation-1">
                          <strong>
                            <u>Interpretation :</u>
                          </strong>
                          <ul>
                            <li v-for="(list, i) in item.interpretation" :key="i">{{ list }}</li>
                          </ul>
                        </v-col>
                      </v-row>
                      <v-row class="pt-0 mt-0">
                        <v-col cols="12">
                          <strong>
                            <u>Medications :</u>
                          </strong>
                          <v-row
                            v-for="(medicine, i) in item.medication"
                            :key="i"
                            class="elevation-2"
                          >
                            <v-col cols="12" md="6">
                              <div>
                                <strong>medicine name:</strong>
                                <span>{{ medicine.medicine_name }}</span>
                              </div>
                              <div>
                                <strong>No.of days :</strong>
                                <span>{{ medicine.days }}</span>
                              </div>
                              <div :v-if="medicine.quantity != undefined">
                                <strong>Quantity :</strong>
                                <span>{{ medicine.quantity }}</span>
                              </div>
                              <div>
                                <div v-if="medicine.morning === true" class="mr-2">
                                  <strong>Morning :</strong>
                                  <v-icon color="green">mdi-check</v-icon>
                                </div>
                                <div v-if="medicine.afternoon === true" class="mr-2">
                                  <strong>Afternoon :</strong>
                                  <v-icon color="green">mdi-check</v-icon>
                                </div>
                                <div v-if="medicine.night === true" class="mr-2">
                                  <strong>Night :</strong>
                                  <v-icon color="green">mdi-check</v-icon>
                                </div>
                              </div>
                            </v-col>
                            <v-col cols="12" md="6">
                              <div>
                                <strong>Additional notes:</strong>
                                <span>{{ medicine.notes }}</span>
                              </div>
                              <div>
                                <strong>Usage:</strong>
                                <span>{{ medicine.usage_type }}</span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-container>
        <!-- ===========--------emd of complaints display--------========== -->
        <!-- #########-----------History Display---------------######### -->
        <v-container>
          <v-card class="grey">
            <v-card-title class="justify-space-between grey">
              <strong>History</strong>
              <v-btn
                icon
                color="white"
                class="red"
                @click="
                  historymodal.show = true;
                  $refs.historyform.resetValidation();
                "
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">
              <v-row v-if="historymodal.datas.length <= 0" class="ma-3 pa-3 grey lighten-2">
                <span>
                  Click
                  <v-btn small icon>
                    <v-icon small color="black">mdi-plus</v-icon>
                  </v-btn>icon, to add patient history
                </span>
              </v-row>
              <v-expansion-panels inset class="pa-0 ma-0">
                <v-expansion-panel
                  v-for="(item, i) in historymodal.datas"
                  :key="i"
                  class="grey lighten-2"
                >
                  <v-expansion-panel-header>
                    <v-row justify="space-between" align="center">
                      <strong>
                        <span>Subject : {{ item.subject }}</span>
                      </strong>
                      <div>
                        <v-btn icon class="mr-5" @click="deletehistory(item, i)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="green lighten-5 pt-2">
                    <div>
                      <strong>Type :</strong>
                      {{ item.type }}
                    </div>
                    <div v-for="(content, i) in item.comment" :key="i">
                      <strong>Description :</strong>
                      {{ content }}
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-container>
        <!-- =========----------End of History Display------------======= -->
        <!-- ------------------------------------------------------------------------------------ -->
      </v-col>
    </v-row>
    <!-- #############---------Complaints modal---------#########--------------------------------------------- -->
    <v-dialog v-model="maincomplaints.show" scrollable max-width="800px" persistent>
      <v-card>
        <v-card-title class="justify-space-between grey lighten-2">
          <strong>Register</strong>
          <v-btn small icon color="white" class="black" @click="clearmedicineform">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
          <v-btn small icon color="white" class="black" @click="maincomplaints.show = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row id="complaint_interpretation">
                <v-col id="complaint" cols="12" md="6" sm="6" xs="12">
                  <v-row class="pb-2 ml-1" align-content="center" justify="space-between">
                    <h3 class="ma-2">
                      <u>Add complaints:</u>
                    </h3>
                    <v-btn
                      icon
                      class="black ma-2"
                      color="white"
                      x-small
                      @click="maincomplaints.noofcomplaints++"
                    >
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </v-row>
                  <v-row
                    class="d-flex"
                    align-content="center"
                    v-for="(no, i) in maincomplaints.noofcomplaints"
                    :key="i"
                  >
                    <v-text-field
                      class="ml-2 mr-2"
                      v-model="maincomplaints.complaints[i]"
                      dense
                      outlined
                      label="complaint"
                    />
                    <v-btn
                      icon
                      class="black ma-2"
                      color="white"
                      x-small
                      @click="
                        maincomplaints.complaints.splice(i, 1);
                        maincomplaints.noofcomplaints--;
                      "
                      v-if="i != 0 || maincomplaints.noofcomplaints != 1"
                    >
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <!-- interpretation column -->
                <v-col id="interpretation" cols="12" md="6" sm="6" xs="6" class>
                  <v-row class="pb-2 ml-1" align-content="center" justify="space-between">
                    <h3 class="ma-2">
                      <u>Interpretations:</u>
                    </h3>
                    <v-btn
                      icon
                      class="black ma-2"
                      color="white"
                      x-small
                      @click="maincomplaints.noofinterpretations++"
                    >
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </v-row>
                  <v-row
                    class="d-flex"
                    align-content="center"
                    v-for="(no, i) in maincomplaints.noofinterpretations"
                    :key="i"
                  >
                    <v-textarea
                      class="ml-2 mr-2"
                      v-model="maincomplaints.interpretations[i]"
                      dense
                      outlined
                      label="interpretation"
                      rows="1"
                    />
                    <v-btn
                      icon
                      class="black ma-2"
                      color="white"
                      x-small
                      @click="
                        maincomplaints.interpretations.splice(i, 1);
                        maincomplaints.noofinterpretations--;
                      "
                      v-if="i != 0 || maincomplaints.noofinterpretations != 1"
                    >
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
              <!-- Medicine display -->
              <v-row>
                <v-col>
                  <v-row class="pb-2 ml-1" align-content="center" justify="space-between">
                    <h3 class="ma-2">
                      <u>Medicines:</u>
                    </h3>
                  </v-row>
                  <v-row v-if="maincomplaints.medication.length === 0" class="pa-2 ml-1">
                    <span>No medicines added yet</span>
                  </v-row>
                  <v-row
                    v-for="(med, i) in maincomplaints.medication"
                    :key="i"
                    justify="space-between"
                    class="pa-2 elevation-1 ml-1"
                  >
                    <span>
                      <strong>Medicine :</strong>
                      {{ med.medicine_name }}
                    </span>
                    <v-btn
                      x-small
                      icon
                      color="white"
                      class="black"
                      @click="maincomplaints.medication.splice(i, 1)"
                    >
                      <v-icon x-small>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
              <!-- Medicine add ------------------------------------------------- -->
              <v-row id="medicine">
                <v-col>
                  <v-row class="pb-2 ml-1" align-content="center" justify="space-between">
                    <h3 class="ma-2">
                      <u>medicines form:</u>
                    </h3>
                  </v-row>
                  <v-form ref="medicineform">
                  <v-row>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-text-field
                        v-model="maincomplaints.medicine_name"
                        outlined
                        dense
                        label="Medicine name"
                        :rules="[v => !!v || 'Medicine name is required']"
                      />
                      <v-text-field
                        v-model="maincomplaints.days"
                        outlined
                        dense
                        label="Number of days"
                        type="number"
                        :rules="[v => (!isNaN(parseInt(v))) || 'Only number is allowed']"
                      />
                      <v-text-field
                        v-model="maincomplaints.quantity"
                        outlined
                        dense
                        label="Quantity"
                        type="number"
                        :rules="[v => (!isNaN(parseInt(v))) || 'Only number is allowed']"
                      />
                      <v-row class="mt-0 pt-0">
                        <v-checkbox v-model="maincomplaints.morning" label="Morning" class="ml-3"></v-checkbox>
                        <v-checkbox
                          v-model="maincomplaints.afternoon"
                          label="Afternoon"
                          class="ml-3"
                        ></v-checkbox>
                        <v-checkbox v-model="maincomplaints.night" label="Night" class="ml-3"></v-checkbox>
                      </v-row>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-text-field
                        v-model="maincomplaints.usage_type"
                        outlined
                        dense
                        label="before / after food"
                      />
                      <v-textarea
                        v-model="maincomplaints.notes"
                        rows="1"
                        outlined
                        dense
                        label="Additional notes"
                      />
                      <v-row justify="center">
                        <v-btn
                          class="green ma-2"
                          color="black"
                          small
                          @click="addtomedicine"
                          width="200px"
                        >Add this medicine</v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-col>
              </v-row>
              <v-row id="labtest">
                <v-col>
                  <v-row justify="start">
                    <v-btn
                      width
                      v-if="!maincomplaints.showlabtest"
                      class="green"
                      @click="maincomplaints.showlabtest = true"
                    >add lab-test</v-btn>
                    <v-btn
                      width="150px"
                      v-if="maincomplaints.showlabtest"
                      class="red"
                      @click="
                        maincomplaints.showlabtest = false;
                        maincomplaints.nooflabtest = 1;
                        maincomplaints.labtestnames = [];
                      "
                    >delete lab-test</v-btn>
                  </v-row>
                  <v-row v-if="maincomplaints.showlabtest">
                    <v-col id="addlabtest" cols="12" md="6" sm="6" xs="12">
                      <v-row class="pb-2 ml-1" align-content="center" justify="space-between">
                        <h3 class="ma-2">Add Labtest</h3>
                        <v-btn
                          icon
                          class="black ma-2"
                          color="white"
                          x-small
                          @click="maincomplaints.nooflabtest++"
                        >
                          <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row
                        class="d-flex"
                        align-content="center"
                        v-for="(no, i) in maincomplaints.nooflabtest"
                        :key="i"
                      >
                        <v-text-field
                          class="ml-2 mr-2"
                          v-model="maincomplaints.labtestnames[i]"
                          dense
                          outlined
                          label="labtest name"
                        />
                        <v-btn
                          icon
                          class="black ma-2"
                          color="white"
                          x-small
                          @click="
                            maincomplaints.labtestnames.splice(i, 1);
                            maincomplaints.nooflabtest--;
                          "
                          v-if="i != 0 || maincomplaints.nooflabtest != 1"
                        >
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row id="submitall">
                <v-btn block color="primary" @click="submitallmedicine">Submit all</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ===========--------emd of complaints modal--------========== -->
    <!-- ------------------------------------------------------------------------------------------ -->

    <!-- ####---------History modal---------#### -->
    <v-dialog v-model="historymodal.show" max-width="600px" persistent>
      <v-card>
        <v-card-title>Add patient history</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="historyform">
              <v-row class="ma-0 pa-0">
                <v-col cols="12" md="5" class="ma-0 pa-0">
                  <v-autocomplete
                    :items="historymodal.historyitems"
                    v-model="historymodal.type"
                    dense
                    outlined
                    label="select type of history"
                    :rules="[(v) => !!v || 'Select a field to proceed']"
                    class="ma-0 pa-0"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row class="ma-0 pa-0">
                <v-col cols="12" md="5" class="ma-0 pa-0">
                  <v-text-field
                    v-model="historymodal.subject"
                    dense
                    outlined
                    label="Subject"
                    :rules="[(v) => !!v || 'Subject is required']"
                    class="ma-0 pa-0"
                  />
                </v-col>
              </v-row>
              <v-row
                align-content="center"
                class="ma-0 pa-0"
                v-for="(no, i) in historymodal.noofcomment"
                :key="i"
              >
                <v-col cols="8" md="10" class="ma-0 pa-0">
                  <v-text-field
                    v-model="historymodal.comment[i]"
                    dense
                    outlined
                    label="Description"
                  />
                </v-col>
                <v-col cols="4" md="2" class="ma-0 pt-2">
                  <v-btn
                    icon
                    class="black mr-1"
                    color="white"
                    x-small
                    @click="historymodal.noofcomment++"
                    v-if="i === historymodal.noofcomment - 1"
                  >
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    class="black"
                    color="white"
                    x-small
                    @click="
                      historymodal.comment.splice(i, 1);
                      historymodal.noofcomment--;
                    "
                    v-if="i != 0 || historymodal.noofcomment != 1"
                  >
                    <v-icon small>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn
                  color="secondary"
                  @click="
                    $refs.historyform.resetValidation();
                    historymodal.show = false;
                    historymodal.noofcomment = 1;
                    historymodal.comment = [];
                    historymodal.subject = '';
                    historymodal.type = '';
                  "
                  text
                >cancel</v-btn>
                <v-btn color="primary" @click="submitaddhistory">Add</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--=====-----end of History Modal--------==== -->
    <!-- ####-------common dialog box-----------#### -->
    <dialog-box v-bind:dialogmessage="dialogdata" />
    <!-- =====-------end of common dialog box-------===== -->
  </v-container>
</template>
<script>
import dialogbox from "../dialogbox/messaga.vue";
export default {
  name: "complaint",
  components: {
    "dialog-box": dialogbox
  },
  props: { patient_data: { type: Object }, patient_record: { type: Object },doctorname: { type: String },doctor_id: { type: String } },
  data: () => ({
    historymodal: {
      show: false,
      datas: [],
      type: "",
      subject: "",
      comment: [],
      noofcomment: 1,
      historyitems: [
        { text: "Family history", value: "familyhistory" },
        { text: "Personal history", value: "personalhistory" },
        { text: "Past history", value: "pasthistory" }
      ]
    },
    maincomplaints: {
      showlabtest: false,
      show: false,
      datas: [],
      complaint_id: "",
      labtest_id: "",
      nooflabtest: 1,
      noofcomplaints: 1,
      noofinterpretations: 1,
      noofmedicines: 1,
      complaints: [],
      interpretations: [],
      medication: [],
      labtestnames: [],
      medicine_name: "",
      usage_type: "",
      morning: false,
      afternoon: false,
      night: false,
      days: "",
      quantity: "",
      notes: ""
    },
    dialogdata: {
      show: false,
      type: "",
      title: "",
      message: "",
      buttontext: ""
    }
  }),
  methods: {
    submitaddhistory: function() {
      if (this.$refs.historyform.validate()) {
        this.$axios
          .post(`/patient/record/add${this.historymodal.type}`, {
            patient_id: this.patient_data._id,
            subject: this.historymodal.subject,
            comment: this.historymodal.comment
          })
          .then(Response => {
            if (Response.data.success) {
              this.historymodal.datas.push({
                comment_id: Response.data.success,
                type: this.historymodal.type,
                subject: this.historymodal.subject,
                comment: this.historymodal.comment
              });
              this.dialogdata.title = "Success";
              this.dialogdata.message = "Added to patient's history";
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "success";
              this.dialogdata.show = true;
              this.historymodal.show = false;
            }
            if (Response.data.error) {
              this.dialogdata.title = "Error";
              this.dialogdata.message = Response.data.error;
              this.dialogdata.buttontext = "Ok";
              this.dialogdata.type = "warning";
              this.dialogdata.show = true;
            }
          });
      }
    },
    clearmedicineform: function() {
      this.maincomplaints.showlabtest = false;
      this.maincomplaints.complaint_id = "";
      this.maincomplaints.nooflabtest = 1;
      this.maincomplaints.noofcomplaints = 1;
      this.maincomplaints.noofinterpretations = 1;
      this.maincomplaints.noofmedicines = 1;
      this.maincomplaints.complaints = [];
      this.maincomplaints.interpretations = [];
      this.maincomplaints.medication = [];
      this.maincomplaints.labtestnames = [];
      this.maincomplaints.medicine_name = "";
      this.maincomplaints.usage_type = "";
      this.maincomplaints.morning = false;
      this.maincomplaints.afternoon = false;
      this.maincomplaints.night = false;
      this.maincomplaints.days = "";
      this.maincomplaints.quantity = "";
      this.maincomplaints.notes = "";
      this.$refs.medicineform.resetValidation()
    },
    addtomedicine: function() {
      if(this.$refs.medicineform.validate()){
      this.maincomplaints.medication.push({
        medicine_name: this.maincomplaints.medicine_name,
        usage_type: this.maincomplaints.usage_type,
        morning: this.maincomplaints.morning,
        afternoon: this.maincomplaints.afternoon,
        night: this.maincomplaints.night,
        days: this.maincomplaints.days,
        quantity: this.maincomplaints.quantity,
        notes: this.maincomplaints.notes
      });
      this.maincomplaints.medicine_name = "";
      this.maincomplaints.usage_type = "";
      this.maincomplaints.morning = false;
      this.maincomplaints.afternoon = false;
      this.maincomplaints.night = false;
      this.maincomplaints.days = "";
      this.maincomplaints.quantity = "";
      this.maincomplaints.notes = "";
      this.$refs.medicineform.resetValidation()
    }},
    submitallmedicine: function() {
      this.$axios
        .post("/patient/complaint/create", { patient_id: this.patient_data._id,"doctor_name":this.doctorname,"doctor_id":this.doctor_id})
        .then(Response => {
          if (Response.data.success) {
            (this.maincomplaints.complaint_id = Response.data.success),
              this.$axios
                .post("/patient/complaint/addcomplaint", {
                  patient_id: this.patient_data._id,
                  complaint_id: Response.data.success,
                  complaints: this.maincomplaints.complaints,
                  interpretation: this.maincomplaints.interpretations,
                  medication: this.maincomplaints.medication
                })
                .then(Response => {
                  if (Response.data.success) {
                    this.maincomplaints.datas.push({
                      complaint_id: this.maincomplaints.complaint_id,
                      complaints: this.maincomplaints.complaints,
                      interpretation: this.maincomplaints.interpretations,
                      medication: this.maincomplaints.medication
                    });
                    if (this.maincomplaints.showlabtest) {
                      this.$axios
                        .post("/patient/complaint/createlabtest", {
                          patient_id: this.patient_data._id,
                          complaint_id: this.maincomplaints.complaint_id
                        })
                        .then(Response => {
                          if (Response.data.success) {
                            this.maincomplaints.labtest_id =
                              Response.data.success;
                            this.$axios
                              .post("/patient/complaint/addlabtest", {
                                patient_id: this.patient_data._id,
                                labtest_id: Response.data.success,
                                test_suggested: this.maincomplaints.labtestnames
                              })
                              .then(Response => {
                                if (Response.data.success) {
                                  this.dialogdata.title = "Success";
                                  this.dialogdata.message =
                                    "Added to patient's history";
                                  this.dialogdata.buttontext = "Ok";
                                  this.dialogdata.type = "success";
                                  this.dialogdata.show = true;
                                  this.maincomplaints.show = false;
                                }
                                if (Response.data.error) {
                                  this.$axios.post("/patient/complaint/dellabtest", {
                                    patient_id: this.patient_data._id,
                                    labtest_id: this.maincomplaints.labtest_id
                                  });
                                }
                              });
                          }
                        });
                    } else {
                      this.dialogdata.title = "Success";
                      this.dialogdata.message = "Added to patient's history";
                      this.dialogdata.buttontext = "Ok";
                      this.dialogdata.type = "success";
                      this.dialogdata.show = true;
                      this.maincomplaints.show = false;
                    }
                  }
                  if (Response.data.error) {
                    this.$axios.post("/patient/complaint/delete", {
                      complaint_id: this.maincomplaints.complaint_id
                    });
                    this.dialogdata.title = "Error";
                    this.dialogdata.message = Response.data.error;
                    this.dialogdata.buttontext = "Ok";
                    this.dialogdata.type = "warning";
                    this.dialogdata.show = true;
                  }
                });
          }
          if (Response.data.error) {
            this.$axios.post("/patient/complaint/delete", {
              complaint_id: this.maincomplaints.complaint_id
            });
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        });
    },
    deletehistory: function(item, i) {
      this.$axios
        .post(`/patient/record/del${item.type}`, {
          patient_id: this.patient_data._id,
          comment_id: item.comment_id
        })
        .then(Response => {
          if (Response.data.success) {
            this.historymodal.datas.splice(i, 1);
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        });
    },
    deletecomplaint: function(complaint_id, i) {
      this.$axios
        .post("/patient/complaint/delete", {
          patient_id: this.patient_data._id,
          complaint_id: complaint_id
        })
        .then(Response => {
          if (Response.data.success) {
            this.maincomplaints.datas.splice(i, 1);
          }
          if (Response.data.error) {
            this.dialogdata.title = "Error";
            this.dialogdata.message = Response.data.error;
            this.dialogdata.buttontext = "Ok";
            this.dialogdata.type = "warning";
            this.dialogdata.show = true;
          }
        });
    }
  },
  watch: {
    patient_data: function(val, oldVal) {
      if (oldVal != val) {
        this.historymodal.show = false;
        this.historymodal.datas = [];
        this.historymodal.type = "";
        this.historymodal.subject = "";
        this.historymodal.comment = [];
        this.historymodal.noofcomment = 1;
        this.maincomplaints.datas = [];
        this.clearmedicineform();
      }
    }
  }
};
</script>
