<template>
  <v-container>
    <div id="app" style="margin-top: 60px">

              <v-btn
                href="https://www.linkedin.com/in/ragir-fernando-71b986176/"
                target="_blank"
                icon
              >
                <v-icon size="24px">{{ icons}}</v-icon>
              </v-btn>

    </div>
  </v-container>
</template>
<script>


import { mdiCar} from "@mdi/js";
export default {
  name: 'teste',
  data: () => ({
    icons: mdiCar,
    /*icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],*/
    items: [
      {icon: mdiCar, link: 'https://www.linkedin.com/in/ragir-fernando-71b986176/'},

    ],
  }),

/*items: [
      {title: 'Veículo', icon: mdiCar, link: '/Veiculo'},
      {title: 'Condutor', icon: mdiCardAccountDetailsOutline, link: '/Condutor'},
      {title: 'Ordem de Tráfego', icon: mdiHighway, link: '/OrdemTrafego'},
      {title: 'Teste', icon: mdiAbTesting, link: '/Teste'}
    ],*/

};
</script>
