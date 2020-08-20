<template>
  <v-container>
    <div id="app" style="margin-top: 60px">
      <v-app id="inspire">
        <v-row justify="space-around">
          <v-menu
              transition="slide-x-transition"
              bottom
              right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="deep-orange"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                Slide X Transition
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="m">
                <v-list-item-title>dsdsds</v-list-item-title>
              </v-list-item>

              <v-list-item @click="m">
                <v-list-item-title>dsdsds</v-list-item-title>
              </v-list-item>

              <v-list-item @click="m">
                <v-list-item-title @click="m">dsdsds</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-row>
      </v-app>

    </div>
  </v-container>
</template>
<script>


export default {
  name: 'teste',

  data: () => ({
    items: [
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me 2'},
    ],
  }),
  methods: {
    m() {
      alert("zxdvsd")
    }
  }


};
</script>
