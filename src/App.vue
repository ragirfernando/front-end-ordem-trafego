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

      <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          interval="3000"
          style="width: 95%; margin: 80px 2.5% 10px 2.5%"
      >
        <v-carousel-item
            v-for="(item,i) in im"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
        ></v-carousel-item>
        <!--<v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
          <v-sheet
              :color="colors[i]"
              height="100%"
          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>-->
      </v-carousel>
      <v-card style="width: 95%; margin: 10px 2.5% 10px 2.5%">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor, ex eget efficitur vehicula, elit
          libero scelerisque ligula, vitae lobortis augue mauris id erat. Maecenas vitae auctor sapien. Aenean consequat
          eleifend mi. Duis malesuada elit risus, in commodo erat porta eget. Nullam pellentesque sit amet purus et
          semper. Nam a sodales diam, dignissim placerat libero. Maecenas a eros nisi. Mauris a imperdiet libero.
          Integer hendrerit sit amet magna sed sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Sed euismod quis mi ac molestie. Etiam eleifend maximus ullamcorper. Duis quis
          euismod nisi. Etiam consequat enim justo, vitae maximus est congue lacinia. In rhoncus tortor cursus arcu
          blandit, tempus tempor arcu consectetur.
        </v-card-text>
      </v-card>
      <v-footer app height="70px">
        <span>&copy; Ragir Fernando</span>
        <div style="padding-left: 40%">
          <v-btn
              href="https://www.linkedin.com/in/ragir-fernando-71b986176/"
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
import {mdiCar, mdiCardAccountDetailsOutline, mdiHighway, mdiAbTesting, mdiLinkedin, mdiGithub} from '@mdi/js';

export default {
  name: "App",
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    iconLinkedin: mdiLinkedin,
    iconGithub: mdiGithub,
    im: [
      {
        src: 'https://raw.githubusercontent.com/ragirfernando/front-end-ordem-trafego/master/src/imagens/Captura%20de%20tela%20de%202020-07-16%2022-06-16.png',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
    items: [
      {title: 'Veículo', icon: mdiCar, link: '/Veiculo'},
      {title: 'Condutor', icon: mdiCardAccountDetailsOutline, link: '/Condutor'},
      {title: 'Ordem de Tráfego', icon: mdiHighway, link: '/OrdemTrafego'},
      {title: 'Teste', icon: mdiAbTesting, link: '/Teste'}
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
