<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
          <v-list dense>

            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1">Veículos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>

        </v-navigation-drawer>

        <v-app-bar app clipped-left>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Ordem de tráfego</v-toolbar-title>
        </v-app-bar>

        <!--<v-content>
          <Veiculo />
        </v-content>-->

        <v-content>
          <Condutor />
        </v-content>

        <v-footer app>
          <span>&copy; Ragir Fernando</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
//import Veiculo from "./components/Veiculo";
import Condutor from "./components/Condutor";


export default {
  name: "App",

  components: {
    //Veiculo
    Condutor
  },

  props: {
    source: String
  },

  data: () => ({
    drawer: null
  }),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
