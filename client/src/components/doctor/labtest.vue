<template>
  <v-container>
    <v-row justify="center" class="pb-0 mb-0" v-if="Object.keys(patient_data).length !== 0">
      <v-col cols="12" xl="6" lg="10" md="12" sm="12">
        <v-container>
          <v-card class="grey">
            <v-card-title class="justify-space-between grey">
              <strong>Labtest</strong>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">
              <v-row v-if="patient_record.labtest.length <= 0" class="ma-3 pa-3 grey lighten-2">
                <span>Got to Attend ----> Add complaints to add a lab-test</span>
              </v-row>
              <v-expansion-panels>
                <v-expansion-panel v-for="(item, i) in patient_record.labtest" :key="i">
                  <v-expansion-panel-header v-slot="{ open }" class="lime lighten-3">
                    <v-row no-gutters>
                      <v-col cols="12" md="3" align-self="center">
                    <strong>Date: {{ dateparser(item.date) }}</strong>
                  </v-col>
                      <v-col cols="12" md="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <v-row justify="end" align="center" v-if="open" class>
                            <div>
                              <v-btn
                                class="mr-5"
                                small
                                @click="
                                  showaddmodal = true;
                                  currentitem = item;
                                "
                              >
                                <v-icon small>mdi-plus</v-icon>
                                <span>result</span>
                              </v-btn>
                       
                              <v-btn class="mr-5" small @click="deletelabtest(item.labtest_id)">
                                <v-icon small>mdi-delete</v-icon>
                                <span>All</span>
                              </v-btn>
                            </div>
                          </v-row>
                          <v-chip-group v-else no-gutters small pills column>
                            <v-chip
                              v-for="(list, i) in item.test_suggested"
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
                  <v-expansion-panel-content>
                    <v-container class="pa-0 ma-0">
                      <v-row class="pb-0 mb-0">
                        <v-col cols="12" class="elevation-1 mt-4">
                          <v-row v-if="item.test_result.length <= 0" align="center">
                            <span>Click on Add result</span>
                            <v-btn
                              small
                              @click="
                                showaddmodal = true;
                                currentitem = item;
                              "
                            >
                              <v-icon small>mdi-plus</v-icon>
                              <span>Add result</span>
                            </v-btn>
                            <span>to add Lab-test results</span>
                          </v-row>
                          <v-row v-else v-for="(results, i) in item.test_result" :key="i">
                            <v-col cols="10">
                              <v-list-item>
                                <div class="text-sm-h6 text-xs-body-1">
                                  <strong>Test:</strong>
                                  {{ results.test }}
                                </div>
                              </v-list-item>
                              <v-list-item>
                                <div class="text-sm-h6 text-xs-body-1">
                                  <strong>Comment:</strong>
                                  {{ results.comment }}
                                </div>
                              </v-list-item>
                            </v-col>
                            <v-col cols="2" align-self="center">
                              <v-btn
                                class="mr-5"
                                small
                                @click="deleteresult(item.labtest_id,results._id)"
                              >
                                <v-icon small>mdi-delete</v-icon>
                              </v-btn>
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
      </v-col>
    </v-row>
    <!--##### Modal for add labtest ###### -->
    <v-dialog v-model="showaddmodal" max-width="800px" persistent>
      <v-card>
        <v-card-title class="justify-space-between grey">
          <span>Add Lab-test results</span>
          <v-btn small dark icon class="red" @click="closemodal">
            <v-icon small color="black">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="grey lighten-2">
          <v-container>
            <v-form ref="historyform">
              <v-row justify="end">
                <v-btn class="mr-5" small @click="addresults">
                  <v-icon small>mdi-plus</v-icon>
                  <span>result</span>
                </v-btn>
              </v-row>
              <v-row
                class="mt-3 elevation-2 grey lighten-3"
                v-for="(item, i) in noofresult"
                :key="i"
              >
                <v-col cols="10">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        dense
                        outlined
                        v-model="datas[i].test"
                        :items="currentitem.test_suggested"
                        label="Test name"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        rows="1"
                        dense
                        outlined
                        v-model="datas[i].comment"
                        label="Test result"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2" align-self="start" v-if="i >= 1 || noofresult > 1">
                  <v-btn small icon class="black" @click="removeresult(i)">
                    <v-icon color="white">mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn class="primary ma-3" @click="submitresult">Submit</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "labtest",
  props: { patient_data: { type: Object }, patient_record: { type: Object } },
  data: () => ({
    showaddmodal: false,
    noofresult: 1,
    datas: [{ test: "", comment: "" }],
    currentitem: {}
  }),
  methods: {
        dateparser(date) {
      return `${String(new Date(parseInt(date)).getFullYear())}-${String(
        "0" + (new Date(parseInt(date)).getMonth() + 1)
      ).slice(-2)}-${String("0" + new Date(parseInt(date)).getDate()).slice(
        -2
      )}`;
    },
    addresults: function() {
      this.noofresult++;
      this.datas.push({ test: "", comment: "" });
    },
    removeresult: function(i) {
      this.noofresult--;
      this.datas.splice(i, 1);
    },
    closemodal: function() {
      this.showaddmodal = false;
      this.noofresult = 1;
      this.datas = [{ test: "", comment: "" }];
      this.currentitem = {};
    },
    submitresult: async function() {
      let submit = await this.datas.map(x => {
        return new Promise((resolve, reject) => {
          this.$axios
            .post("/patient/complaint/addlabresult", {
              patient_id: this.patient_data._id,
              labtest_id: this.currentitem.labtest_id,
              test: x.test,
              comment: x.comment
            })
            .then(Response => {
              if (Response.data.success) {
                console.log("success:" + Response.data.success);
                return resolve("success");
              }
              if (Response.data.error) {
                console.log("error:" + Response.data.error);
                return reject("error");
              }
            });
        });
      });
      console.log(await submit);
      Promise.all(submit)
        .then(() => {
          this.showaddmodal = false;
          this.noofresult = 1;
          this.datas = [{ test: "", comment: "" }];
          this.currentitem = {};
          this.$emit("refreshdetails");
        })
        .catch(err => {
          alert(err);
        });
    },
    deleteresult: function(labtestid, id) {
      this.$axios
        .post("/patient/complaint/dellabresult", {
          patient_id: this.patient_data._id,
          labtest_id: labtestid,
          result_id: id
        })
        .then(Response => {
          if (Response.data.success) {
            this.$emit("refreshdetails");
          }
          if (Response.data.error) {
            console.log(Response.data.error);
          }
        })
        .catch(err => console.log(err));
    },
    deletelabtest: function(labtestid) {
      this.$axios
        .post("/patient/complaint/dellabtest", {
          patient_id: this.patient_data._id,
          labtest_id: labtestid,
        })
        .then(Response => {
          if (Response.data.success) {
            this.$emit("refreshdetails");
          }
          if (Response.data.error) {
            console.log(Response.data.error);
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
