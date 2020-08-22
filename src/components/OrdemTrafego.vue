<template>
  <v-container>
    <div id="app" style="margin: 60px -7% ; ">
      <v-alert
          v-model="alertSucesso"
          type="success"
          close-text="Close Alert"
          dismissible>
        {{ mensagemSucesso }}
      </v-alert>

      <v-alert
          v-model="alertInfo"
          type="info"
          close-text="Close Alert"
          dismissible>
        {{ mensagemInfo }}
      </v-alert>

      <v-alert
          v-model="alertError"
          type="error"
          close-text="Close Alert"
          dismissible
      >
        {{ mensagemError }}
      </v-alert>

      <v-expansion-panels popout style="margin-bottom: 10px;">
        <v-expansion-panel>
          <v-expansion-panel-header style="font-size: 25px">Consultas</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs botton>
              <v-tab>
                <v-icon left>{{ iconDate }}</v-icon>
                Intervalo entre datas
              </v-tab>

              <v-tab>
                <v-icon left>{{ iconOrigem }}</v-icon>
                Origem
              </v-tab>

              <!--<v-tab>
                <v-icon left>{{ iconnomeCondutor }}</v-icon>
                Nome
              </v-tab>-->

              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                        v-model="menuDataInicial"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dataInicial"
                            label="Data inicial *"
                            persistent-hint
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          locale="br"
                          v-model="dateInicial"
                          no-title
                          @input="menuDataInicial = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                        v-model="menuDataFinal"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dataFinal"
                            label="Data final *"
                            persistent-hint
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          locale="br"
                          v-model="dateFinal"
                          no-title
                          @input="menuDataFinal = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-btn style="margin-top: 25px" :disabled="valid" @click="listarOrdensTrafegoIntervaloData()">Buscar
                    condutor
                  </v-btn>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="nomeCondutor"
                        label="Digite o nome do condutor *"
                    ></v-text-field>
                  </v-col>
                  <v-btn style="margin-top: 25px" @click="buscaCondutorNome">Buscar condutor</v-btn>
                </v-row>
              </v-tab-item>

              <!-- <v-tab-item>
                 <v-row>
                   <v-col cols="12" sm="6" md="4">
                     <v-select
                         v-model="categoriaCnhCondutor"
                         :items="categoriaCnh"
                         :rules="regra"
                         label="Selecione a categoria da CNH *"
                     ></v-select>
                   </v-col>
                   <v-btn style="margin-top: 25px" @click="listarCondutoresCategoriaCnh()">Buscar condutores</v-btn>
                 </v-row>
               </v-tab-item>-->
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-data-table :headers="cabecalhoOrdensTrafego" :items="listaOrdensTrafego" class="elevation-1 subtitle-1"
                    :search="filtrar">
        <template v-slot:top>
          <v-toolbar flat color="#">
            <v-toolbar-title>Lista de Ordens de tráfego</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-card-title style="width: 45%">
              <v-text-field
                  v-model="filtrar"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn @click="novaOrdemTrafego">Nova ordem de tráfego</v-btn>
            <v-dialog
                v-model="dialogoDeletar"
                max-width="90%"
            >
              <v-card>
                <v-card-title>
                  <span>Deseja deletar essa ordem de tráfego?</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      text
                      @click="dialogoDeletar = false"
                  >
                    Fecha
                  </v-btn>

                  <v-btn
                      color="primary"
                      text
                      @click="deletarOrdemTrafego"
                  >
                    Deletar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="95%" style="height: 0px">
              <v-card>
                <div>
                  <v-alert
                      v-model="alert"
                      type="error"
                      close-text="Close Alert"
                      dismissible
                  >
                    {{ mensagemError }}
                  </v-alert>
                </div>
                <v-card-title>
                  <span class="headline">{{ inserirOuAtualizar }}</span>
                </v-card-title>
                <v-tabs botton>
                  <v-tab>
                    <v-icon left>{{ iconVeiculo }}</v-icon>
                    Veículo
                  </v-tab>

                  <v-tab>
                    <v-icon left>{{ iconCondutor }}</v-icon>
                    Condutor
                  </v-tab>

                  <v-tab>
                    <v-icon left>{{ iconOrigem }}</v-icon>
                    Origem
                  </v-tab>

                  <v-tab>
                    <v-icon left>{{ iconDestino }}</v-icon>
                    Destino
                  </v-tab>

                  <v-tab>
                    <v-icon left>{{ iconSalvar }}</v-icon>
                    Salvar
                  </v-tab>

                  <v-tab-item>
                    <hr/>
                    <v-data-table :headers="cabecalhoVeiculoSelecionado" :items="veiculoSelecionado">
                      <template v-slot:no-data>
                        <v-card-subtitle>Nenhum veículo adicionado</v-card-subtitle>
                      </template>
                    </v-data-table>
                    <hr/>
                    <v-expansion-panels popout>
                      <v-expansion-panel>
                        <v-expansion-panel-header style="font-size: 25px" @click="listarVeiculos">
                          Lista de veículos
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-text-field
                              v-model="filtrarVeiculo"
                              append-icon="mdi-magnify"
                              label="Filtrar"
                              single-line
                              hide-details
                          ></v-text-field>
                          <hr/>
                          <v-data-table :headers="cabecalhoVeiculos" :items="listaVeiculos" :search="filtrarVeiculo">
                            <template v-slot:item.acoes="{item}">
                              <v-icon @click="selecionarVeiculo(item)">{{ iconSelecionar }}</v-icon>
                            </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-tab-item>

                  <v-tab-item>
                    <hr/>
                    <v-data-table :headers="cabecalhoCondutorSelecionado" :items="condutorSelecionado">
                      <template v-slot:no-data>
                        <v-card-subtitle>Nenhum condutor adicionado</v-card-subtitle>
                      </template>
                    </v-data-table>
                    <hr/>
                    <v-expansion-panels popout>
                      <v-expansion-panel>
                        <v-expansion-panel-header @click="listarCondutores" style="font-size: 25px">Lista de
                          condutores
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-text-field
                              v-model="filtrarCondutor"
                              append-icon="mdi-magnify"
                              label="Filtrar"
                              single-line
                              hide-details
                          ></v-text-field>
                          <hr/>
                          <v-data-table :headers="cabecalhoCondutores" :items="listaCondutores"
                                        :search="filtrarCondutor">
                            <template v-slot:item.acoes="{item}">
                              <v-icon @click="selecionarCondutor(item)">{{ iconSelecionar }}</v-icon>
                            </template>
                          </v-data-table>

                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.cep" label="Cep *"
                                          @keyup="consultarCepOrigem"
                                          v-mask="'#####-###'">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.localidade"
                                          label="Cidade *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.uf"
                                          label="Estado *">

                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.logradouro"
                                          label="Logradouro *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.bairro"
                                          label="Bairro *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.numero"
                                          label="Número *"
                                          v-mask="'###############'">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.origem.complemento"
                                          label="Complemento *">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.cep"
                                          label="Cep *"
                                          @keyup="consultarCepDestino"
                                          v-mask="'#####-###'">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.localidade"
                                          label="Cidade *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.uf"
                                          label="Estado *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.logradouro"
                                          label="Logradouro *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.bairro"
                                          label="Bairro *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.numero"
                                          label="Número *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.destino.complemento"
                                          label="Complemento *">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-menu
                                ref="menu"
                                v-model="menu3"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="ordemTrafego.hora"
                                    label="Hora *"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                  v-if="menu3"
                                  v-model="ordemTrafego.hora"
                                  format="24hr"
                                  full-width
                                  @click:minute="$refs.menu.save(ordemTrafego.hora)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
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
                                    v-model="ordemTrafego.data"
                                    label="Data *"
                                    persistent-hint
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  locale="br"
                                  v-model="date"
                                  no-title
                                  @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="ordemTrafego.distanciaPercorrer"
                                          label="Distância *">
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                                v-model="ordemTrafego.status"
                                :items="statusOrdemTrafego"
                                label="Selecione o status *"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                        <v-btn color="white" text @click="inserirOrdemTrafego">Salvar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.acoes="{ item }">
          <v-menu
              transition="slide-x-transition"
              bottom
              right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  dark
                  v-bind="attrs"
                  v-on="on"
              >{{ iconClick }}
              </v-icon>
            </template>
            <v-list>
              <v-list-item @click="editarOrdemTrafego(item)">
                <v-list-item-title>Atualizar</v-list-item-title>
              </v-list-item>

              <v-list-item @click="dialogoDeletarOrdemTrafego(item)">
                <v-list-item-title>Deletar</v-list-item-title>
              </v-list-item>

              <!--<v-list-item @click="listarOrdensTrafegoRelacionadaCondutor(item)">
                <v-list-item-title>Ordem tráfego veículo</v-list-item-title>
              </v-list-item>-->
            </v-list>
          </v-menu>
          <!-- <v-icon small class="mr-2" @click="editarOrdemTrafego(item)">mdi-pencil</v-icon>
           <v-icon small @click="dialogoDeletarOrdemTrafego(item)">mdi-delete</v-icon>-->
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="listarOrdensTrafego">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import {
  mdiHomeFloor1,
  mdiHomeFloor2,
  mdiCarBack,
  mdiCardAccountDetails,
  mdiContentSaveAll,
  mdiPlusBox,
  mdiCursorDefaultClick,
  mdiCalendarRange
} from '@mdi/js';
import OrdemTrafegoService from '../service/ordemTrafegoService';
import CondutorService from '../service/condutorService';
import ConsultarCepService from "@/service/cepService";
import VeiculoService from "@/service/veiculoService";

export default {
  name: 'ordemTrafego',
  data: () => ({
    valid: true,
    alert: false,
    alertError: false,
    alertInfo: false,
    alertSucesso: false,
    mensagemError: "",
    mensagemSucesso: "",
    mensagemInfo: "",
    iconDate: mdiCalendarRange,
    iconClick: mdiCursorDefaultClick,
    iconOrigem: mdiHomeFloor1,
    iconDestino: mdiHomeFloor2,
    iconVeiculo: mdiCarBack,
    iconCondutor: mdiCardAccountDetails,
    iconSalvar: mdiContentSaveAll,
    iconSelecionar: mdiPlusBox,
    idAuxiliar: "",
    statusOrdemTrafego: ["ANDAMENTO", "AGENDADA", "FINALIZADA"],
    menu1: false,
    menuDataInicial: false,
    menuDataFinal: false,
    date: "",
    dateInicial: "",
    dateFinal: "",
    dataInicial: "",
    dataFinalComparar: "",
    dataInicialComparar: "",
    dataFinal: "",
    filtrar: '',
    filtrarVeiculo: '',
    filtrarCondutor: '',
    menu: false,
    time: null,
    menu3: false,
    drawer: null,
    dialog: false,
    dialogoDeletar: false,
    cabecalhoOrdensTrafego: [
      {text: "Cidade de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.localidade"},
      {text: "Cidade de Destino", class: "subtitle-1 Bold text", sortable: false, value: "destino.localidade"},
      {text: "Data", class: "subtitle-1 Bold text", sortable: false, value: "data"},
      {text: "Hora", class: "subtitle-1 Bold text", sortable: false, value: "hora"},
      {text: "Condutor", class: "subtitle-1 Bold text", sortable: false, value: "condutor.nome"},
      {text: "Veículo", class: "subtitle-1 Bold text", sortable: false, value: "veiculo.modelo"},
      {text: "Status", class: "subtitle-1 Bold text", sortable: false, value: "status"},
      {text: "Distância", class: "subtitle-1 Bold text", sortable: false, value: "distanciaPercorrer"},
      {text: "Ações", class: "subtitle-1 Bold text", value: "acoes", sortable: false}
    ],
    cabecalhoVeiculos: [
      {text: "Marca", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "marca"},
      {text: "Modelo", sortable: false, class: "subtitle-1 Bold text", value: "modelo"},
      {text: "Quilometragem ", class: "subtitle-1 Bold text", sortable: false, value: "kmRodados"},
      {text: "Placa", sortable: false, class: "subtitle-1 Bold text", value: "placa"},
      {text: "Cor", sortable: false, class: "subtitle-1 Bold text", value: "cor"},
      {text: "Ano", sortable: false, class: "subtitle-1 Bold text", value: "anoFabricacao"},
      {text: "Categoria", sortable: false, class: "subtitle-1 Bold text", value: "categoriaVeiculo"},
      {text: "Combustível", sortable: false, class: "subtitle-1 Bold text", value: "tipoCombustivel"},
      {text: "Conservação", sortable: false, class: "subtitle-1 Bold text", value: "estadoConservacao"},
      {text: "Ações", value: "acoes", class: "subtitle-2 Bold text", sortable: false}
    ],
    cabecalhoVeiculoSelecionado: [
      {text: "Marca", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "marca"},
      {text: "Modelo", sortable: false, class: "subtitle-1 Bold text", value: "modelo"},
      {text: "Quilometragem ", class: "subtitle-1 Bold text", sortable: false, value: "kmRodados"},
      {text: "Placa", sortable: false, class: "subtitle-1 Bold text", value: "placa"},
      {text: "Cor", sortable: false, class: "subtitle-1 Bold text", value: "cor"},
      {text: "Ano", sortable: false, class: "subtitle-1 Bold text", value: "anoFabricacao"},
      {text: "Categoria", sortable: false, class: "subtitle-1 Bold text", value: "categoriaVeiculo"},
      {text: "Combustível", sortable: false, class: "subtitle-1 Bold text", value: "tipoCombustivel"},
      {text: "Conservação", sortable: false, class: "subtitle-1 Bold text", value: "estadoConservacao"},
    ],
    cabecalhoCondutores: [
      {text: "Nome", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "nome"},
      {text: "Categoria Cnh", class: "subtitle-1 Bold text", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Cidade", class: "subtitle-1 Bold text", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", class: "subtitle-1 Bold text", sortable: false, value: "endereco.bairro"},
      {text: "CPF", class: "subtitle-1 Bold text", sortable: false, value: "cpf"},
      {text: "Matricula", class: "subtitle-1 Bold text", sortable: false, value: "matricula"},
      {text: "Ações", value: "acoes", class: "subtitle-1 Bold text", sortable: false}
    ],
    cabecalhoCondutorSelecionado: [
      {text: "Nome", class: "subtitle-1 Bold text", align: "start", sortable: false, value: "nome"},
      {text: "Categoria Cnh", class: "subtitle-1 Bold text", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Cidade", class: "subtitle-1 Bold text", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", class: "subtitle-1 Bold text", sortable: false, value: "endereco.bairro"},
      {text: "CPF", class: "subtitle-1 Bold text", sortable: false, value: "cpf"},
      {text: "Matricula", class: "subtitle-1 Bold text", sortable: false, value: "matricula"},
    ],
    listaOrdensTrafego: [],
    veiculoSelecionado: [],
    listaVeiculos: [],
    condutorSelecionado: [],
    listaCondutores: [],
    veiculo: {
      marca: "",
      modelo: "",
      kmRodados: "",
      placa: "",
      cor: "",
      anoFabricacao: "",
      categoriaVeiculo: "",
      tipoCombustivel: "",
      estadoConservacao: ""
    },
    condutor: {
      id: null,
      nome: "",
      cnh: {
        numeroCNH: "",
        categoriaCNH: "",
        validade: "",
      },
      endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      cpf: "",
      matricula: ""
    },
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
    inserirOuAtualizar: "",
  }),

  computed: {},

  watch: {
    date(val) {
      console.log(val)
      this.ordemTrafego.data = this.formatDate(this.date);
    },

    dateInicial(val) {
      this.dataInicialComparar = val;
      this.dataInicial = this.formatDate(val)
      this.compararDatas()
    },

    dateFinal(val) {
      this.dataFinalComparar = val;
      this.dataFinal = this.formatDate(val)
      this.compararDatas()
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.listarOrdensTrafego();
  },

  methods: {
    compararDatas() {
      if (this.dataFinalComparar.length > 0 && this.dataInicialComparar.length > 0) {
        var inicial = new Date(this.dataInicialComparar);
        var final = new Date(this.dataFinalComparar);
        if (inicial.getTime() > final.getTime()) {
          this.valid = true;
          this.alertError = true
          this.mensagemError = "A data inicial não pode ser maior que data final!"
          setTimeout(this.fecharAlerError, 5000);
        } else {
          this.valid = false;
        }
      }
    },

    listarOrdensTrafegoIntervaloData() {
      let listaAuxiliar = [];
      OrdemTrafegoService.listarOrdensTrafegoIntervaloData(this.dataInicialComparar, this.dataFinalComparar).then(resposta => {
        console.log(resposta.data)
        resposta.data.forEach(da => {
          da.data = this.formatDate(da.data)
          listaAuxiliar.push(da)
        })
        this.listaOrdensTrafego = listaAuxiliar;
      });

    },

    listarOrdensTrafego() {
      let listaAuxiliar = [];
      OrdemTrafegoService.listar().then(resposta => {
        resposta.data.forEach(da => {
          da.data = this.formatDate(da.data)
          listaAuxiliar.push(da)
        })
        this.listaOrdensTrafego = listaAuxiliar;
      });
    },

    listarVeiculos() {
      VeiculoService.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
        console.log(this.listaVeiculos)
      }).catch(error => {
        console.log(error)
      })
    },

    listarCondutores() {
      CondutorService.listar().then(resposta => {
        this.listaCondutores = resposta.data
      }).catch(error => {
        console.log(error)
      })
    },

    selecionarVeiculo(item) {
      this.veiculoSelecionado = []
      this.veiculoSelecionado.push(item)
    },

    selecionarCondutor(item) {
      this.condutorSelecionado = []
      this.condutorSelecionado.push(item)
    },

    consultarCepOrigem() {
      this.alert = false;
      if (this.ordemTrafego.origem.cep.length == 9) {
        ConsultarCepService.consultarCep(this.ordemTrafego.origem.cep).then(resposta => {
          if (resposta.data.erro) {
            this.alert = true;
            this.mensagemError = " Por favor, digite um cep válido!"
            this.ordemTrafego.origem.logradouro = "";
            this.ordemTrafego.origem.bairro = "";
            this.ordemTrafego.origem.localidade = "";
            this.ordemTrafego.origem.uf = "";
          } else {
            this.ordemTrafego.origem.logradouro = resposta.data.logradouro;
            this.ordemTrafego.origem.bairro = resposta.data.bairro;
            this.ordemTrafego.origem.localidade = resposta.data.localidade;
            this.ordemTrafego.origem.uf = resposta.data.uf;
          }
        }).catch(error => {
          console.log(error)
        });
      }
    },

    consultarCepDestino() {
      this.alert = false;
      if (this.ordemTrafego.destino.cep.length == 9) {
        ConsultarCepService.consultarCep(this.ordemTrafego.destino.cep).then(resposta => {
          if (resposta.data.erro) {
            this.alert = true;
            this.mensagemError = " Por favor, digite um cep válido!"
            this.ordemTrafego.destino.logradouro = "";
            this.ordemTrafego.destino.bairro = "";
            this.ordemTrafego.destino.localidade = "";
            this.ordemTrafego.origem.uf = "";
          } else {
            this.ordemTrafego.destino.logradouro = resposta.data.logradouro;
            this.ordemTrafego.destino.bairro = resposta.data.bairro;
            this.ordemTrafego.destino.localidade = resposta.data.localidade;
            this.ordemTrafego.destino.uf = resposta.data.uf;
          }
        }).catch(error => {
          console.log(error)
        });
      }
    },

    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    fecharAlertInfo() {
      this.alertInfo = false
    },
    fecharAlerError() {
      this.alertError = false
    },

    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    novaOrdemTrafego() {
      this.listarOrdensTrafego();
      this.inserirOuAtualizar = "Inserir nova ordem de tráfego"
      this.ordemTrafego.origem.id = null;
      this.ordemTrafego.origem.cep = "";
      this.ordemTrafego.origem.logradouro = "";
      this.ordemTrafego.origem.complemento = "";
      this.ordemTrafego.origem.bairro = "";
      this.ordemTrafego.origem.localidade = "";
      this.ordemTrafego.origem.numero = "";
      this.ordemTrafego.origem.uf = "";

      this.ordemTrafego.destino.id = null;
      this.ordemTrafego.destino.cep = "";
      this.ordemTrafego.destino.logradouro = "";
      this.ordemTrafego.destino.complemento = "";
      this.ordemTrafego.destino.bairro = "";
      this.ordemTrafego.destino.localidade = "";
      this.ordemTrafego.destino.numero = "";
      this.ordemTrafego.destino.uf = "";

      this.ordemTrafego.id = null;
      this.ordemTrafego.hora = "";
      this.ordemTrafego.data = "";
      this.ordemTrafego.status = "";
      this.ordemTrafego.distanciaPercorrer = "";

      this.condutorSelecionado = [];
      this.veiculoSelecionado = []
      this.dialog = true;
    },

    fecharDialog() {
      this.dialog = false;
    },

    formatarDataInserir(date) {
      console.log(date)
      const dateFormatada = date.split('/')
      return `${dateFormatada[2]}-${dateFormatada[1]}-${dateFormatada[0]}`
    },

    inserirOrdemTrafego() {
      if (this.veiculoSelecionado.length <= 0 || this.condutorSelecionado.length <= 0) {
        this.alert = true;
        this.mensagemError = "Por favor, selecione o veículo e condutor!"
      } else {
        this.alert = false;
        this.mensagemError = "";
        this.ordemTrafego.data = this.formatarDataInserir(this.ordemTrafego.data)
        if (this.ordemTrafego.id == null) {
          OrdemTrafegoService.inserir(this.ordemTrafego, this.condutorSelecionado[0].id, this.veiculoSelecionado[0].id).then(resposta => {
            console.log(resposta);
            this.alertSucesso = true
            this.mensagemSucesso = "Ordem de tráfego inserida com sucesso"
            setTimeout(this.fecharAlertSucesso, 3000);
            this.listarOrdensTrafego();
          });
        } else {
          OrdemTrafegoService.editar(this.ordemTrafego, this.condutorSelecionado[0].id, this.veiculoSelecionado[0].id).then(resposta => {
            console.log(resposta);
            this.alertSucesso = true
            this.mensagemSucesso = "Ordem de tráfego atualizada com sucesso!"
            setTimeout(this.fecharAlertSucesso, 3000);
            this.listarOrdensTrafego();
          });
        }
        this.dialog = false;
      }
    },

    editarOrdemTrafego(item) {
      this.inserirOuAtualizar = "Atualizar ordem de trafego"
      this.veiculoSelecionado = [];
      this.condutorSelecionado = [];
      this.ordemTrafego = item
      this.veiculoSelecionado.push(item.veiculo);
      this.condutorSelecionado.push(item.condutor)
      this.dialog = true;
    },

    dialogoDeletarOrdemTrafego(item) {
      this.idAuxiliar = item.id
      this.dialogoDeletar = true;
    },

    fecharAlertSucesso() {
      this.alertSucesso = false;
    },

    deletarOrdemTrafego() {
      OrdemTrafegoService.deletar(this.idAuxiliar).then(resposta => {
        this.listarOrdensTrafego();
        console.log(resposta);
        this.alertSucesso = true
        this.mensagemSucesso = "Ordem de tráfego deletada com sucesso!"
        setTimeout(this.fecharAlertSucesso, 3000);
      }).catch(e => {
        console.log(e);
      });
      this.idAuxiliar = "";
      this.dialogoDeletar = false;
    }
  }
};
</script>
