<template>
  <v-container style="width: 100%">
    <div id="app" style="margin: 60px -9% ; ">
      <v-alert
          v-model="alertInfo"
          type="info"
          close-text="Close Alert"
          dismissible>
        {{ mensagemInfo }}
      </v-alert>
      <v-expansion-panels popout>
        <v-expansion-panel>
          <v-expansion-panel-header style="font-size: 25px">Consultas</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs botton>
              <v-tab>
                <v-icon left>{{ iconMarca }}</v-icon>
                Por marca
              </v-tab>

              <v-tab>
                <v-icon left>{{ iconModelo }}</v-icon>
                Por marca
              </v-tab>

              <v-tab>
                <v-icon left>{{ iconKm }}</v-icon>
                Por intervalo de km rodados
              </v-tab>

              <v-tab>
                <v-icon left>{{ iconEstadoConservacao }}</v-icon>
                Por estado de conservação
              </v-tab>
              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="veiculoMarca"
                        :items="marcaVeiculo"
                        label="Selecione a marca *"
                    ></v-select>
                  </v-col>

                  <v-btn style="margin-top: 25px" @click="listarVeiculosMarca()">Buscar veículos</v-btn>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="veiculoModelo"
                        label="Modelo *"
                    ></v-text-field>
                  </v-col>
                  <v-btn style="margin-top: 25px" @click="listarVeiculosModelo()">Buscar veículos</v-btn>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="kmInicial"
                        label="Quilometragem inicial *"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="kmFinal"
                        label="Quilometragem final *"
                    ></v-text-field>
                  </v-col>
                  <v-btn style="margin-top: 25px" @click="listarVeiculosIntervaloKmRodados()">Buscar veículos</v-btn>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="veiculoEstadoConservacao"
                        :items="estadoConservacao"
                        label="Selecione o estado de conservação *"
                    ></v-select>
                  </v-col>

                  <v-btn style="margin-top: 25px" @click="listarVeiculosEstadoConservacao()">Buscar veículos</v-btn>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <br/>
      <v-banner v-model="dialogOrdensTrafego" single-line transition="slide-y-transition">
        <v-checkbox v-model="dialogOrdensTrafego" label="Fechar"></v-checkbox>
        <v-data-table style="margin-left: 55px" :headers="cabecalhoOrdensTrafego" :items="listaOrdensTrafego">
        </v-data-table>

      </v-banner>
      <br/>
      <v-data-table :headers="nomeColunas" :items="listaVeiculos" :search="search">
        <template v-slot:top>
          <v-toolbar flat color="#">
            <v-dialog v-model="dialogDeletarVeiculo" max-width="350">
              <v-card>
                <v-card-title class="headline">Deletar veículo</v-card-title>
                <v-card-text v-if="veiculoDeletar != null">Deseja de deletar o veículo, modelo:
                  {{ veiculoDeletar.modelo }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="darken-1"
                      text
                      @click="dialogDeletarVeiculo = false"
                  >Cancelar
                  </v-btn>
                  <v-btn
                      color="darken-1"
                      text
                      @click="deletarVeiculo"
                  >Deletar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-toolbar-title>Lista de veículos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-card-title style="width: 85%">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
              ></v-text-field>
              <v-btn style="margin-left: 2%" @click="mostrarDialoFormularios">Novo veículo</v-btn>
            </v-card-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogFormularios" max-width="95%">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ novoOuAtualizar }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>

                    <v-form
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                    >
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              placeholder="Selecione"
                              v-model="veiculo.marca"
                              :items="marcaVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a marca *"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              v-model="veiculo.cor"
                              :items="corVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a cor *"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              v-model="veiculo.anoFabricacao"
                              :items="anoVeiculo"
                              @click="preencherAnoVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o ano de fabricação *"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              v-model="veiculo.categoriaVeiculo"
                              :items="categoriaVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a categoria *"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              v-model="veiculo.estadoConservacao"
                              :items="estadoConservacao"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o estado de Conservação"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                              v-model="veiculo.tipoCombustivel"
                              :items="combustivelVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o combustível *"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                              v-model="veiculo.modelo"
                              label="Modelo *"
                              :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="veiculo.kmRodados"
                                        label="Quilometragem rodada *"
                                        :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                              v-model="veiculo.placa"
                              v-mask="'AAA-####'"
                              @keyup="maskPlaca"
                              label="Placa *"
                              :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="white" text @click="dialogFormularios = false">Cancelar</v-btn>
                  <v-btn color="white" text :disabled="!valid" @click="inserirVeiculo">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.acoes="{item}">
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
                Ações
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="atualizarVeiculo(item)">
                <v-list-item-title>Atualizar</v-list-item-title>
              </v-list-item>

              <v-list-item @click="mostrarDialogDeletar(item)">
                <v-list-item-title>Deletar</v-list-item-title>
              </v-list-item>

              <v-list-item @click="listarOrdensTrafegoRelacionadaVeiculo(item)">
                <v-list-item-title>Ordem tráfego veículo</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!--<v-icon small class="mr-2" @click="atualizarVeiculo(item)">mdi-pencil</v-icon>
          <v-icon small @click="mostrarDialogDeletar(item)">mdi-delete</v-icon>-->
        </template>
        <template v-slot:no-data>
          <h3 color="#" dark>Sem veículos</h3>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import VeiculoService from '../service/veiculoService';
import {mdiMagnify, mdiWatermark, mdiGlobeModel, mdiSpeedometer, mdiCarDoor} from '@mdi/js';

export default {
  name: "veiculo",
  data: () => ({
    alertInfo: false,
    teste: false,
    mensagemInfo: "",
    veiculoMarca: "",
    veiculoModelo: "",
    veiculoEstadoConservacao: "",
    kmInicial: "",
    kmFinal: "",
    iconKm: mdiSpeedometer,
    iconBuscar: mdiMagnify,
    iconMarca: mdiWatermark,
    iconModelo: mdiGlobeModel,
    iconEstadoConservacao: mdiCarDoor,
    valid: true,
    lazy: false,
    dialogCamposObrigatorios: false,
    dialogDeletarVeiculo: false,
    dialogListarVeiculos: true,
    dialogOrdensTrafego: false,
    posicao: null,
    anoAtual: "",
    search: '',
    marcaVeiculo: ["Fiat", "Chevrolet", "Ford", "Toyota"],
    corVeiculo: ["Branca", "Vermelha", "Preta", "Azul", "Amarela"],
    anoVeiculo: [],
    categoriaVeiculo: ["Passeio", "Suv", "Caminhonete", "Ônibus", "Van"],
    combustivelVeiculo: ["Diesel", "Gasolina", "Álcool", "Flex"],
    estadoConservacao: ["NOVO", "SEMINOVO", "USADO"],
    drawer: null,
    dialogFormularios: false,
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
    listaVeiculos: [],
    listaOrdensTrafego: [],
    veiculoDeletar: {},
    novoOuAtualizar: "",
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
    cabecalhoOrdensTrafego: [
      {text: "Cidade de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.localidade"},
      {text: "uf de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.uf"},
      {text: "Cidade de Destino", class: "subtitle-1 Bold text", sortable: false, value: "destino.localidade"},
      {text: "uf de Destino", class: "subtitle-1 Bold text", sortable: false, value: "origem.uf"},
      {text: "Data", class: "subtitle-1 Bold text", sortable: false, value: "data"},
      {text: "Hora", class: "subtitle-1 Bold text", sortable: false, value: "hora"},
      {text: "Condutor", class: "subtitle-1 Bold text", sortable: false, value: "condutor.nome"},
      {text: "Veículo", class: "subtitle-1 Bold text", sortable: false, value: "veiculo.modelo"},
      {text: "Status", class: "subtitle-1 Bold text", sortable: false, value: "status"},
      {text: "Distância", class: "subtitle-1 Bold text", sortable: false, value: "distanciaPercorrer"},
    ],
    ordemTrafego: {
      origem: {
        id: null,
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      destino: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      id: null,
      hora: "",
      status: "",
      data: "",
      distanciaPercorrer: ""
    },
  }),

  computed: {},

  watch: {},

  created() {
    this.$vuetify.theme.dark = true;
    this.listarVeiculos();
  },

  methods: {
    maskPlaca() {
      this.veiculo.placa = this.veiculo.placa.toUpperCase();
    },
    preencherAnoVeiculo() {
      const anoAtual = new Date().getFullYear();
      let incremento = 0;
      while (incremento <= 4) {
        this.anoVeiculo.push(anoAtual - incremento)
        incremento++;
      }
    },

    mostrarDialogDeletar(item) {
      this.veiculoDeletar = item;
      this.posicao = this.veiculoDeletar[item];
      this.dialogDeletarVeiculo = true;

    },

    mostrarDialoFormularios() {
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo veículo";
      this.reset();
    },
    reset() {
      this.$refs.form.reset()
    },

    retornarPrimeiraLetraMaiuscula(primeiraLetraMaiuscula) {
      return primeiraLetraMaiuscula.substring(0, 1) +
          primeiraLetraMaiuscula.toLowerCase().substring(1, primeiraLetraMaiuscula.length)
    },

    retornarPalavraMaiuscula(palavra) {
      return palavra.replace("Á", "A").replace("Ô", "O").toUpperCase();
    },

    listarVeiculos() {
      VeiculoService.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
      }).catch(error => {
        console.log(error)
      })
    },

    listarVeiculosMarca() {
      VeiculoService.listarVeiculosMarca(this.veiculoMarca).then(resposta => {
        this.listaVeiculos = [];
        this.listaVeiculos = resposta.data;
        if (this.listaVeiculos.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Nenhum veículo com a marca " + this.veiculoMarca + " esta salvo na base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        }
      }).catch(error => {
        console.log(error)
      })
    },

    listarVeiculosModelo() {
      VeiculoService.listarVeiculosModelo(this.veiculoModelo).then(resposta => {
        this.listaVeiculos = [];
        this.listaVeiculos = resposta.data;
        if (this.listaVeiculos.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Nenhum veículo com a marca " + this.veiculoModelo + " esta salvo na base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        }
      }).catch(error => {
        console.log(error)
      })
    },

    listarVeiculosIntervaloKmRodados() {
      VeiculoService.listarVeiculosIntervaloKmRodados(this.kmInicial, this.kmFinal).then(resposta => {
        this.listaVeiculos = [];
        this.listaVeiculos = resposta.data;
        if (this.listaVeiculos.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Nenhum veículo entre o intervalo de quilometragem rodados esta salvo na base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        }
      }).catch(error => {
        console.log(error)
      })
    },

    listarVeiculosEstadoConservacao() {
      VeiculoService.listarVeiculosEstadoConservacao(this.veiculoEstadoConservacao).then(resposta => {
        this.listaVeiculos = [];
        this.listaVeiculos = resposta.data;
        if (this.listaVeiculos.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Nenhum veículo com estado conservação '" + this.veiculoEstadoConservacao + "' esta salvo na base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        }
      }).catch(error => {
        console.log(error)
      })
    },

    listarOrdensTrafegoRelacionadaVeiculo(item) {
      let listaAuxiliar = [];
      VeiculoService.listarOrdensTrafegoRelacionadaVeiculo(item.id).then(resposta => {
        if (resposta.data.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Esse veículo não está relacionado a nenhuma ordem de tráfego!"
          setTimeout(this.fecharAlertInfo, 5000);
        } else {
          resposta.data.forEach(res => {
            res.data = this.formatDate(res.data);
            listaAuxiliar.push(res);
          })
          this.listaOrdensTrafego = listaAuxiliar
          this.dialogOrdensTrafego = true;
        }
      });
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    fecharAlertInfo() {
      this.alertInfo = false
    },

    atualizarVeiculo(item) {
      this.novoOuAtualizar = "Atualizar veículo"
      this.veiculo = Object.assign({}, item);
      this.dialogFormularios = true;
    },

    deletarVeiculo() {
      VeiculoService.deletarVeiculo(this.veiculoDeletar.id).then(resposta => {
        console.log(resposta);
      }).catch(e => {
        console.log(e);
      });
      this.listaVeiculos.splice(this.posicao, 1)
      this.dialogDeletarVeiculo = false;
    },

    inserirVeiculo() {
      this.veiculo.estadoConservacao = this.retornarPalavraMaiuscula(this.veiculo.estadoConservacao);
      this.veiculo.categoriaVeiculo = this.retornarPalavraMaiuscula(this.veiculo.categoriaVeiculo);
      this.veiculo.tipoCombustivel = this.retornarPalavraMaiuscula(this.veiculo.tipoCombustivel);

      if (this.veiculo.id == null) {
        VeiculoService.inserirVeiculo(this.veiculo).then(resposta => {
          console.log(resposta);
          this.listarVeiculos()
        }).catch(error => {
          console.log(error)
        });
      } else
        VeiculoService.atualizarVeiculo(this.veiculo).then(resposta => {
          console.log(resposta)
          this.listarVeiculos();
        }).catch(error => {
          console.log(error)
        })

      this.listarVeiculos();
      this.dialogFormularios = false;

    }
  }
};
</script>
