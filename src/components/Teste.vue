<template>
  <v-container>
    <div id="app" style="margin-top: 60px">

      <v-app id="inspire">
        <v-simple-table style="margin-bottom: 20px">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Modelo</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ dveiculo.anoFabricacao }}</td>
              <td>{{ dveiculo.modelo }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header @click="f">Lista de veículos</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                  v-model="filtrar"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
              ></v-text-field>
              <v-data-table :headers="nomeColunas" loading="true" :items="listaVeiculos" :search="filtrar">
                <template v-slot:item.acoes="{item}">
                  <v-icon @click="selecionar(item)">mdi-pencil</v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-app>

      <!--<v-app id="inspire">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            @item-selected="t"
            :single-select="singleSelect"
            item-key="name"
            show-select
            class="elevation-1"
        >
        </v-data-table>
      </v-app>-->
      <!--<v-app id="inspire">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="dateFormatted"
                      label="Date"
                      persistent-hint
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>

          </v-row>
        </v-container>
      </v-app>-->
    </div>
  </v-container>
</template>
<script>

import VeiculoService from "@/service/veiculoService";

export default {
  name: 'teste',

  data() {
    return {
      desserts: [],
      filtrar: '',


      veiculo: {
        id: null,
        marca: "",
        modelo: "",
        kmRodados: 0,
        placa: "",
        cor: "",
        anoFabricacao: 0,
        categoriaVeiculo: "",
        tipoCombustivel: "",
        estadoConservacao: ""
      },

      dveiculo: {
        id: null,
        marca: "",
        modelo: "",
        kmRodados: 0,
        placa: "",
        cor: "",
        anoFabricacao: "Por favor, clique em Lista de veículos e selecione um veículo.",
        categoriaVeiculo: "",
        tipoCombustivel: "",
        estadoConservacao: ""
      },
      listaVeiculos: [],
      nomeColunas: [
        {text: "Marca", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "marca"},
        {text: "Modelo", sortable: false, class: "subtitle-2 Bold text", value: "modelo"},
        {text: "Quilometragem ", class: "subtitle-2 Bold text", sortable: false, value: "kmRodados"},
        {text: "Placa", sortable: false, class: "subtitle-2 Bold text", value: "placa"},
        {text: "Cor", sortable: false, class: "subtitle-2 Bold text", value: "cor"},
        {text: "Ano", sortable: false, class: "subtitle-2 Bold text", value: "anoFabricacao"},
        {text: "Categoria", sortable: false, class: "subtitle-2 Bold text", value: "categoriaVeiculo"},
        {text: "Combustível", sortable: false, class: "subtitle-2 Bold text", value: "tipoCombustivel"},
        {text: "Conservação", sortable: false, class: "subtitle-2 Bold text", value: "estadoConservacao"},
        {text: "Ações", value: "acoes", class: "subtitle-2 Bold text", sortable: false}
      ],
    }
  },
  created() {
    this.$vuetify.theme.dark = true;

  },

  methods: {
    f(){
      this.listarVeiculos();
    },
    listarVeiculos() {
      VeiculoService.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
        console.log(this.listaVeiculos)
      }).catch(error => {
        console.log(error)
      })
    },

    selecionar(item){
      this.dveiculo.anoFabricacao = item.anoFabricacao;
      this.dveiculo.modelo = item.modelo;
    }
  }

  /*data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date (val) {
      console.log(val)
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },*/
};
</script>
