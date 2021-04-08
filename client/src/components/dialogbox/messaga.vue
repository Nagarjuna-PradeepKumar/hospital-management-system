<template>
  <v-dialog v-model="dialogmessage.show" max-width="500px">
    <v-card>
      <v-card-title
        v-bind:class="dialogmessage.type"
        class="headline lighten-2"
      >{{ dialogmessage.title }}</v-card-title>
      <v-card-text class="pt-6">{{dialogmessage.message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-1"
          text
          @click="dialogmessage.show= false"
        >{{dialogmessage.buttontext}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "dialogbox",
  props: ["dialogmessage"],
  data: function() {
    return {
      showme: true
    };
  }
};
</script>