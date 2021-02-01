<template>
  <div id="app" style="background-color: azure">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped style="width: 200px">
        <v-list dense nav>
          <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.link"
          >
            <v-list-item-icon style="margin-right: 10px">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="subtitle-1">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase">Gestão de frotas</v-toolbar-title>
      </v-app-bar>

       <v-footer app height="70px">
        <span>&copy; Ragir Fernando</span>
        <div style="padding-left: 40%">
          <v-btn
              href="https://www.linkedin.com/in/ragirfernando/"
              target="_blank"
              icon>
            <v-icon size="24px">{{ iconLinkedin }}</v-icon>
          </v-btn>
          <v-btn
              href="https://github.com/ragirfernando"
              target="_blank"
              icon>
            <v-icon size="24px">{{ iconGithub }}</v-icon>
          </v-btn>
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import {mdiCar, mdiCardAccountDetailsOutline, mdiHighway, mdiLinkedin, mdiGithub} from '@mdi/js';

export default {
  name: "App",
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    iconLinkedin: mdiLinkedin,
    iconGithub: mdiGithub,
    items: [
      {title: 'Veículo', icon: mdiCar, link: '/Veiculo'},
      {title: 'Condutor', icon: mdiCardAccountDetailsOutline, link: '/Condutor'},
      {title: 'Ordem de Tráfego', icon: mdiHighway, link: '/OrdemTrafego'}
    ],
    right: null,
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    slides: [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
    ],
  }),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
