<template>
  <v-container>
    <v-row justify="center" class="pb-0 mb-0">
      <v-col cols="12" xl="4" lg="8" md="10" sm="8">
        <!-- family history -->
        <v-card id="family_history" class="yellow lighten-2 mb-2">
          <v-card-title>Family history</v-card-title>
          <v-card-subtitle v-if="patient_record.family_history.length === 0">No data found</v-card-subtitle>
          <v-expansion-panels inset>
            <v-expansion-panel
              v-for="(item, i) in patient_record.family_history"
              :key="i"
              class="yellow lighten-3"
            >
              <v-expansion-panel-header>
                <v-row justify="space-between" align="center">
                  <span>{{ item.subject }}</span>
                  <div>
                    <v-btn
                      icon
                      class="mr-5"
                      @click="deletehistory(item._id, 'delfamilyhistory')"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="(content, i) in item.comment"
                :key="i"
                class="yellow lighten-5 pt-2"
                >{{ content }}</v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- personal history -->
        <v-card id="personal_history" class="green lighten-2 mb-2">
          <v-card-title>Personal history</v-card-title>
          <v-card-subtitle v-if="patient_record.personal_history.length === 0"
            >No data found</v-card-subtitle
          >
          <v-expansion-panels inset>
            <v-expansion-panel
              v-for="(item, i) in patient_record.personal_history"
              :key="i"
              class="green lighten-3"
            >
              <v-expansion-panel-header>
                <v-row justify="space-between" align="center">
                  <span>{{ item.subject }}</span>
                  <div>
                    <v-btn
                      icon
                      class="mr-5"
                      @click="deletehistory(item._id, 'delpersonalhistory')"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="(content, i) in item.comment"
                :key="i"
                class="green lighten-5 pt-2"
                >{{ content }}</v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- past history -->
        <v-card id="past_history" class="blue lighten-2 mb-2">
          <v-card-title>Past history</v-card-title>
          <v-card-subtitle v-if="patient_record.past_history.length === 0"
            >No data found</v-card-subtitle
          >
          <v-expansion-panels inset>
            <v-expansion-panel
              v-for="(item, i) in patient_record.past_history"
              :key="i"
              class="blue lighten-3"
            >
              <v-expansion-panel-header>
                <v-row justify="space-between" align="center">
                  <span>{{ item.subject }}</span>
                  <div>
                    <v-btn
                      icon
                      class="mr-5"
                      @click="deletehistory(item._id, 'delpasthistory')"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="(content, i) in item.comment"
                :key="i"
                class="blue lighten-5 pt-2"
                >{{ content }}</v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- complaint history -->
        <v-card id="complaint_history" class="lime lighten-2 mb-2">
          <v-card-title>Past complaints</v-card-title>
          <v-card-subtitle v-if="patient_record.complaint_history.length === 0"
            >No data found</v-card-subtitle
          >
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, i) in patient_record.complaint_history"
              :key="i"
            >
              <v-expansion-panel-header
                v-slot="{ open }"
                class="lime lighten-3"
              >
                <v-row no-gutters>
                  <v-col cols="12" md="3" align-self="center">
                    <strong>Date: {{ dateparser(item.date) }}</strong>
                  </v-col>
                  <v-col cols="12" md="9" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <v-row justify="end" align="center" v-if="open">
                        <div>
                          <v-btn
                            icon
                            class="mr-5"
                            @click="deletecomplaint(item.complaint_id)"
                          >
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
                          <v-avatar left class="green darken-1">{{
                            i + 1
                          }}</v-avatar>
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
                        <li v-for="(list, i) in item.complaints" :key="i">
                          {{ list }}
                        </li>
                      </ul>
                    </v-col>
                    <v-col cols="12" md="6" class="elevation-1">
                      <strong>
                        <u>Interpretation :</u>
                      </strong>
                      <ul>
                        <li v-for="(list, i) in item.interpretation" :key="i">
                          {{ list }}
                        </li>
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
                            <div
                              v-if="medicine.afternoon === true"
                              class="mr-2"
                            >
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "history",
  props: { patient_data: { type: Object }, patient_record: { type: Object } },
  methods: {
    dateparser(date) {
      return `${String(new Date(parseInt(date)).getFullYear())}-${String(
        "0" + (new Date(parseInt(date)).getMonth() + 1)
      ).slice(-2)}-${String("0" + new Date(parseInt(date)).getDate()).slice(
        -2
      )}`;
    },
    deletehistory: function(comment_id, target) {
      this.$axios
        .post("/patient/record/" + target, {
          patient_id: this.patient_data._id,
          comment_id: comment_id,
        })
        .then((Response) => {
          if (Response.data.success) {
            this.$emit("refreshdetails");
          }
        });
    },
    deletecomplaint: function(complaint_id) {
      this.$axios
        .post("/patient/complaint/delete", {
          patient_id: this.patient_data._id,
          complaint_id: complaint_id,
        })
        .then((Response) => {
          if (Response.data.success) {
            this.$emit("refreshdetails");
          }
        });
    },
  },
};
</script>
