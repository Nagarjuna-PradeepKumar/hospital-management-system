<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <!-- ----------Top row--------- -->
        <v-row id="toprow" justify="space-around">
          <!--##-- date card --##-->
          <v-col cols="12" sm="4">
            <v-card>
              <v-img
                class="white--text align-end"
                height="200px"
                src="../../assets/images/clock.jpg"
              >
                <v-card-title>{{date}}</v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <!-- ##--quotes--## -->
          <v-col cols="12" sm="7">
            <v-card elevation="5">
              <v-img
                class="white--text align-end"
                height="200px"
                src="../../assets/images/background.jpg"
              >
                <div class="ma-5">
                  <span
                    v-if="doctordatas[2].quote"
                    style="word-wrap:break-word,"
                    class="text-h6"
                  >{{doctordatas[2].quote}}</span>
                  <span v-else style="word-wrap:break-word," class="text-h6">Loading ...</span>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------Bottom row------------- -->
        <v-row justify="space-around">
          <v-col cols="12" sm="7">
            <v-card>
              <v-row class="black lighten-5 white--text justify-center pa-3 ma-0">
                <span style="word-wrap:break-word," class="text-h6">Top prescribed medicines</span>
              </v-row>
              <v-data-table
                :headers="headers"
                :items="doctordatas[1].medicine_history"
                :items-per-page="5"
                class="elevation-1"
                dark
                dense
              ></v-data-table>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5">
              <v-img
                class="white--text align-end"
                height="200px"
                src="../../assets/images/patient.jpg"
              ></v-img>
              <v-row class="black lighten-5 white--text justify-center pa-3 ma-0">
                <span
                  v-if="doctordatas[0].totalcases[0]"
                  style="word-wrap:break-word,"
                  class="text-h6"
                >Total cases attended: {{doctordatas[0].totalcases[0].totalcases}}</span>
                <span v-else style="word-wrap:break-word," class="text-h6">Total cases attended: 0</span>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "doctor_dashboard",
  props: ["doctor_id", "doctordatas"],
  data: () => ({
    date: `${String("0" + new Date().getDate()).slice(-2)}-${String(
      "0" + (new Date().getMonth() + 1)
    ).slice(-2)}-${String(new Date().getFullYear())}`,
    headers: [
      { text: "Medicine", align: "start", sortable: true, value: "_id" },
      { text: "Times", value: "count" }
    ]
  })
};
</script>
