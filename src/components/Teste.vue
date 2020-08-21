<template>
  <v-container>
    <div id="app" style="margin-top: 60px">
      <v-checkbox v-model="v0" label="Fechar"></v-checkbox>
      <v-banner v-model="v0" single-line transition="slide-y-transition">
        No Internet connection
        <template v-slot:actions="{ dismiss }">
          <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
          <v-btn text color="primary">Retry</v-btn>
        </template>
      </v-banner>
    </div>
  </v-container>
</template>
<script>


export default {
  name: 'teste',
  data: () => ({
    v0: false,
  }),



};
</script>
